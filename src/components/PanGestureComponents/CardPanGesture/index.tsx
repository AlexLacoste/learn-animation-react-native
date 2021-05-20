import React from "react";
import { View } from "react-native";
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import Animated, {
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withDecay,
} from "react-native-reanimated";
import { clamp, withBouncing } from "react-native-redash";

import { Card, Cards } from "../../Card";
import { CARD_WIDTH, CARD_HEIGHT } from "../../Card/style";
import styles from "./style";

interface CardPanGestureProps {
    width: number;
    height: number;
}

const CardPanGesture = ({ width, height }: CardPanGestureProps) => {
    const boundX = width - CARD_WIDTH;
    const boundY = height - CARD_HEIGHT;

    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const onGestureEvent = useAnimatedGestureHandler<
        PanGestureHandlerGestureEvent,
        {
            offsetX: number;
            offsetY: number;
        }
    >({
        onStart: (_, ctx) => {
            ctx.offsetX = translateX.value;
            ctx.offsetY = translateY.value;
        },
        onActive: (event, ctx) => {
            translateX.value = clamp(ctx.offsetX + event.translationX, 0, boundX);
            translateY.value = clamp(ctx.offsetY + event.translationY, 0, boundY);
        },
        onEnd: ({ velocityX, velocityY }) => {
            translateX.value = withBouncing(
                withDecay({
                    velocity: velocityX,
                }),
                0,
                boundX,
            );
            translateY.value = withBouncing(
                withDecay({
                    velocity: velocityY,
                }),
                0,
                boundY,
            );
        },
    });
    const style = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
    }));

    return (
        <View style={styles.container}>
            <PanGestureHandler onGestureEvent={onGestureEvent}>
                <Animated.View {...{ style }}>
                    <Card card={Cards.Card1} />
                </Animated.View>
            </PanGestureHandler>
        </View>
    );
};

export default CardPanGesture;
