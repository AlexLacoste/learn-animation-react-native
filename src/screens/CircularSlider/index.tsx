import React from "react";
import { View, StyleSheet } from "react-native";
import Animated, { interpolateColor, useDerivedValue, useSharedValue } from "react-native-reanimated";
import { canvas2Polar } from "react-native-redash";

import Cursor from "../../components/CircularSliderComponents/Cursor";
import CircularProgress from "../../components/CircularSliderComponents/CircularProgress";

import styles, { r } from "./style";
import StyleGuide from "../../components/StyleGuide";

const STROKE_WIDTH: number = 40;

const defaultTheta: number = canvas2Polar({ x: 0, y: 0 }, { x: r, y: r }).theta;

const CircularSlider = () => {
    const theta: Animated.SharedValue<number> = useSharedValue(defaultTheta);
    const backgroundColor: Readonly<Animated.SharedValue<string | number>> = useDerivedValue(() =>
        interpolateColor(theta.value, [0, Math.PI, Math.PI * 2], ["#ff4f38", StyleGuide.palette.primary, "#383fff"])
    );

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Animated.View style={StyleSheet.absoluteFill}>
                    <CircularProgress strokeWidth={STROKE_WIDTH} {...{ theta, r, backgroundColor }} />
                </Animated.View>
                <Cursor strokeWidth={STROKE_WIDTH} r={r - STROKE_WIDTH / 2} {...{ theta, backgroundColor }} />
            </View>
        </View>
    );
};

export default CircularSlider;
