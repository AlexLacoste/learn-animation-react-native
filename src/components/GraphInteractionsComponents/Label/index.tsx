import React from "react";
import { View } from "react-native";
import Animated, { useDerivedValue } from "react-native-reanimated";
import { ReText, round } from "react-native-redash";

import styles from "./style";

export interface DataPoint {
    coord: {
        x: number;
        y: number;
    };
    data: {
        x: number;
        y: number;
    };
}

interface LabelProps {
    point: Animated.SharedValue<DataPoint>;
}

const Label = ({ point }: LabelProps) => {
    const date = useDerivedValue(() => {
        const d = new Date(point.value.data.x);
        return d.toLocaleDateString("fr", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    });
    const price = useDerivedValue(() => {
        const p = point.value.data.y;
        return `${round(p, 2).toLocaleString("fr", { currency: "EUR" })} €`;
    });

    return (
        <View>
            <ReText text={date} style={styles.date} />
            <ReText text={price} style={styles.price} />
        </View>
    );
};

export default Label;
