import React from "react";
import { View, Dimensions } from "react-native";
import Svg, { Path, Defs, Stop, LinearGradient } from "react-native-svg";
import * as shape from "d3-shape";
import Animated, { interpolate, Extrapolate, useSharedValue, useDerivedValue } from "react-native-reanimated";

import { getPointAtLength, parsePath, PathInterface } from "../../components/AnimatedHelpers/SVG";

import Cursor from "../../components/GraphInteractionsComponents/Cursor";
import Label from "../../components/GraphInteractionsComponents/Label";

import styles from "./style";

const { width } = Dimensions.get("window");
const height: number = width;

const data: [number, number][] = [
    { x: new Date(2020, 5, 1), y: 4371 },
    { x: new Date(2020, 5, 2), y: 6198 },
    { x: new Date(2020, 5, 3), y: 5310 },
    { x: new Date(2020, 5, 4), y: 7188 },
    { x: new Date(2020, 5, 5), y: 8677 },
    { x: new Date(2020, 5, 6), y: 5012 }
].map((p) => [p.x.getTime(), p.y]);

const domain = {
    x: [Math.min(...data.map(([x]) => x)), Math.max(...data.map(([x]) => x))],
    y: [Math.min(...data.map(([, y]) => y)), Math.max(...data.map(([, y]) => y))]
};

const range = {
    x: [0, width],
    y: [height, 0]
};

const scale = (v: number, d: number[], r: number[]): number => {
    "worklet";

    return interpolate(v, d, r, Extrapolate.CLAMP);
};

const scaleInvert = (y: number, d: number[], r: number[]): number => {
    "worklet";

    return interpolate(y, r, d, Extrapolate.CLAMP);
};

const d: string = shape
    .line()
    .x(([x]) => scale(x, domain.x, range.x))
    .y(([, y]) => scale(y, domain.y, range.y))
    .curve(shape.curveBasis)(data) as string;

const path: PathInterface = parsePath(d);

const GraphInteractions = () => {
    const length: Animated.SharedValue<number> = useSharedValue(200);
    const point = useDerivedValue(() => {
        const p = getPointAtLength(path, length.value);
        return {
            coord: {
                x: p.x,
                y: p.y
            },
            data: {
                x: scaleInvert(p.x, domain.x, range.x),
                y: scaleInvert(p.y, domain.y, range.y)
            }
        };
    });

    return (
        <View style={styles.container}>
            <Label {...{ point }} />
            <View>
                <Svg {...{ width, height }}>
                    <Defs>
                        <LinearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="gradient">
                            <Stop stopColor="#CDE3F8" offset="0%" />
                            <Stop stopColor="#eef6fd" offset="80%" />
                            <Stop stopColor="#FEFFFF" offset="100%" />
                        </LinearGradient>
                    </Defs>
                    <Path fill="transparent" stroke="#367be2" strokeWidth={5} {...{ d }} />
                    <Path d={`${d}  L ${width} ${height} L 0 ${height}`} fill="url(#gradient)" />
                </Svg>
                <Cursor {...{ path, length, point }} />
            </View>
        </View>
    );
};

export default GraphInteractions;
