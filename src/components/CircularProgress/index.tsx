import React from "react";
import { StyleSheet } from "react-native";
import Animated, { interpolateColor, useAnimatedProps } from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";
import StyleGuide from "../StyleGuide";


const { PI } = Math;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface CircularProgressProps {
    theta: Animated.SharedValue<number>;
    r: number;
    strokeWidth: number;
    backgroundColor: Animated.SharedValue<string | number>;
}

const CircularProgress = ({ theta, r, strokeWidth, backgroundColor }: CircularProgressProps) => {
    const radius = r - strokeWidth / 2;
    const circumference = radius * 2 * PI;

    const props = useAnimatedProps(() => {
        backgroundColor.value = interpolateColor(
            theta.value,
            [0, Math.PI, Math.PI * 2],
            ["#ff4f38", StyleGuide.palette.primary, "#383fff"]
        );
        return { stroke: backgroundColor.value, strokeDashoffset: theta.value * radius };
    });

    return (
        <Svg style={StyleSheet.absoluteFill}>
            <Circle cx={r} cy={r} fill="transparent" stroke="white" r={radius} {...{ strokeWidth }} />
            <AnimatedCircle
                animatedProps={props}
                cx={r}
                cy={r}
                fill="transparent"
                r={radius}
                strokeDasharray={`${circumference}, ${circumference}`}
                {...{ strokeWidth }}
            />
        </Svg>
    );
};

export default CircularProgress;
