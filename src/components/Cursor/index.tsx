import React from "react";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, { interpolateColor, useAnimatedGestureHandler, useAnimatedStyle } from "react-native-reanimated";
import { canvas2Polar, clamp, polar2Canvas } from "react-native-redash";
import StyleGuide from "../StyleGuide";
import styles from "./style";

const THRESHOLD = 0.001;

interface CursorProps {
    r: number;
    strokeWidth: number;
    theta: Animated.SharedValue<number>;
    backgroundColor: Animated.SharedValue<string | number>;
}

const Cursor = ({ r, strokeWidth, theta, backgroundColor }: CursorProps) => {
    const center = { x: r, y: r };
    const onGestureEvent = useAnimatedGestureHandler({
        onStart: (_event, ctx: any) => {
            ctx.offset = polar2Canvas(
                {
                    theta: theta.value,
                    radius: r
                },
                center
            );
        },
        onActive: (event, ctx: any) => {
            const { translationX, translationY } = event;
            const x: number = ctx.offset.x + translationX;
            const y1 = ctx.offset.y + translationY;
            let y: number;
            if (x < r) {
                y = y1;
            } else if (theta.value < Math.PI) {
                y = clamp(y1, 0, r - THRESHOLD);
            } else {
                y = clamp(y1, r, 2 * r);
            }
            const value: number = canvas2Polar({ x, y }, center).theta;
            theta.value = value > 0 ? value : 2 * Math.PI + value;
        }
    });
    const style = useAnimatedStyle(() => {
        const { x: translateX, y: translateY } = polar2Canvas(
            {
                theta: theta.value,
                radius: r
            },
            center
        );
        backgroundColor.value = interpolateColor(
            theta.value,
            [0, Math.PI, Math.PI * 2],
            ["#ff4f38", StyleGuide.palette.primary, "#383fff"]
        );

        return { backgroundColor: backgroundColor.value, transform: [{ translateX }, { translateY }] };
    });

    return (
        <PanGestureHandler {...{ onGestureEvent }}>
            <Animated.View
                style={[
                    styles.circle,
                    { width: strokeWidth, height: strokeWidth, borderRadius: strokeWidth / 2 },
                    style
                ]}
            />
        </PanGestureHandler>
    );
};

export default Cursor;
