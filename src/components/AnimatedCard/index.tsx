import React from "react";
import { Dimensions } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { mix } from "react-native-redash";

import { Card, Cards } from "../Card";
import StyleGuide from "../StyleGuide";

import styles from "./style";

const { width } = Dimensions.get("window");
const origin = -(width / 2 - StyleGuide.spacing * 2);

interface AnimatedCardProps {
    transition: Animated.SharedValue<number>;
    index: number;
    card: Cards;
}

const AnimatedCard = ({ card, transition, index }: AnimatedCardProps) => {
    const style = useAnimatedStyle(() => {
        const rotate: number = (index - 1) * mix(transition.value, 0, Math.PI / 6);
        return {
            transform: [{ translateX: origin }, { rotate: `${rotate}rad` }, { translateX: -origin }]
        };
    });
    return (
        <Animated.View key={card} style={[styles.overlay, style]}>
            <Card {...{ card }} />
        </Animated.View>
    );
};

export default AnimatedCard;
