import React, { useState } from "react";
import { View } from "react-native";
import { useSpring } from "react-native-redash";

import Button from "../../components/Button";
import { Cards, cards } from "../../components/Card";
import AnimatedCard from "../../components/AnimatedCard";

import styles from "./style";

const Transition = () => {
    const [toggled, setToggle] = useState(false);
    return (
        <View style={styles.container}>
            {cards.slice(0, 3).map((card: Cards, index: number) => (
                <AnimatedCard key={card} {...{ index, card, toggled }} />
            ))}
            <Button label={toggled ? "Reset" : "Start"} primary onPress={() => setToggle((prev) => !prev)} />
        </View>
    );
};

export default Transition;
