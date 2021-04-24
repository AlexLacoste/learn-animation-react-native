import React from "react";
import { View } from "react-native";
import Animated from "react-native-reanimated";

import Bubble from "../Bubble";

import styles from "./style";

interface ChatBubbleProps {
    progress: Animated.SharedValue<number>;
}

const ChatBubble = ({ progress }: ChatBubbleProps) => {
    const bubbles = [0, 1, 2];
    const delta = 1 / bubbles.length;

    return (
        <View style={styles.root}>
            <View style={styles.container}>
                {bubbles.map((i) => {
                    const start = i * delta;
                    const end = start + delta;
                    return <Bubble key={i} {...{ start, end, progress }} />;
                })}
            </View>
        </View>
    );
};

export default ChatBubble;
