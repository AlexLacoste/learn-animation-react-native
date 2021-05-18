import React, { useState } from "react";
import { View } from "react-native";
import { useSpring } from "react-native-redash";

import Button from "../../components/Button";
import { Cards, cards } from "../../components/Card";
import AnimatedCard from "../../components/TransitionsComponents/AnimatedCard";

import styles from "./style";

const UseTransition = () => {
    const [toggled, setToggle] = useState(false);
    const transition = useSpring(toggled, { velocity: 5 });

    return (
        <View style={styles.container}>
            {cards.slice(0, 3).map((card: Cards, index: number) => (
                <AnimatedCard key={card} {...{ index, card, transition }} />
            ))}
            <Button label={toggled ? "Reset" : "Start"} primary onPress={() => setToggle((prev) => !prev)} />
        </View>
    );
};

export default UseTransition;
