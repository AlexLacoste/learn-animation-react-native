import React, { forwardRef, Ref, useImperativeHandle } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import Animated, {
    Extrapolate,
    interpolate,
    runOnJS,
    useAnimatedGestureHandler,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";
import { snapPoint } from "react-native-redash";

import Profile, { α, ProfileModel } from "../Profile";

const { width, height } = Dimensions.get("window");
export const A: number = Math.sin(α) * height + Math.cos(α) * width;
const snapPoints: number[] = [-A, 0, A];

export interface SwipeHandler {
    swipeLeft: () => void;
    swipeRight: () => void;
}

interface SwiperProps {
    scale: Animated.SharedValue<number>;
    onSwipe: () => void;
    profile: ProfileModel;
    onTop: boolean;
}

const swipe = (translateX: Animated.SharedValue<number>, dest: number, velocity: number, cb: () => void) => {
    "worklet";

    translateX.value = withSpring(
        dest,
        {
            velocity,
            overshootClamping: dest !== 0,
            restSpeedThreshold: dest === 0 ? 0.01 : 100,
            restDisplacementThreshold: dest === 0 ? 0.01 : 100,
            damping: 13,
        },
        () => {
            if (dest !== 0) {
                runOnJS(cb)();
            }
        },
    );
};

const Swiper = ({ scale, onSwipe, profile, onTop }: SwiperProps, ref: Ref<SwipeHandler>) => {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    useImperativeHandle(ref, () => ({
        swipeLeft: () => {
            swipe(translateX, -A, 5, onSwipe);
        },
        swipeRight: () => {
            swipe(translateX, A, 5, onSwipe);
        },
    }));

    const onGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, { x: number; y: number }>({
        onStart: (_, ctx) => {
            ctx.x = translateX.value;
            ctx.y = translateY.value;
        },
        onActive: ({ translationX, translationY }, ctx) => {
            translateX.value = translationX + ctx.x;
            translateY.value = translationY + ctx.y;
            scale.value = interpolate(translateX.value, [-width / 2, 0, width / 2], [1, 0.97, 1], Extrapolate.CLAMP);
        },
        onEnd: ({ velocityX, velocityY }) => {
            const dest: number = snapPoint(translateX.value, velocityX, snapPoints);
            swipe(translateX, dest, 5, onSwipe);
            translateY.value = withSpring(0, { velocity: velocityY, damping: 13 });
        },
    });

    return (
        <PanGestureHandler {...{ onGestureEvent }}>
            <Animated.View style={StyleSheet.absoluteFill}>
                <Profile
                    profile={profile}
                    onTop={onTop}
                    translateX={translateX}
                    translateY={translateY}
                    scale={scale}
                />
            </Animated.View>
        </PanGestureHandler>
    );
};

export default forwardRef(Swiper);
