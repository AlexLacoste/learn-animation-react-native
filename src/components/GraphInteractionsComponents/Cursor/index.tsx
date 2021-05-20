import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    withDecay,
} from "react-native-reanimated";

import { PathInterface } from "../../AnimatedHelpers/SVG";
import { DataPoint } from "../Label";

import styles, { CURSOR } from "./style";

const { width } = Dimensions.get("window");

interface CursorProps {
    path: PathInterface;
    length: Animated.SharedValue<number>;
    point: Animated.SharedValue<DataPoint>;
}

const Cursor = ({ path, length, point }: CursorProps) => {
    const onGestureEvent = useAnimatedGestureHandler({
        onStart: (_event, ctx: any) => {
            ctx.offsetX = interpolate(length.value, [0, path.length], [0, width], Extrapolate.CLAMP);
        },
        onActive: (event, ctx: any) => {
            length.value = interpolate(
                ctx.offsetX + event.translationX,
                [0, width],
                [0, path.length],
                Extrapolate.CLAMP,
            );
        },
        onEnd: ({ velocityX }) => {
            length.value = withDecay({
                velocity: velocityX,
                clamp: [0, path.length],
                deceleration: 0.9972,
            });
        },
    });
    const style = useAnimatedStyle(() => {
        const translateX = point.value.coord.x - CURSOR / 2;
        const translateY = point.value.coord.y - CURSOR / 2;
        return {
            transform: [{ translateX }, { translateY }],
        };
    });

    return (
        <View style={StyleSheet.absoluteFill}>
            <PanGestureHandler {...{ onGestureEvent }}>
                <Animated.View style={[styles.cursorContainer, style]}>
                    <View style={styles.cursor} />
                </Animated.View>
            </PanGestureHandler>
        </View>
    );
};

export default Cursor;
