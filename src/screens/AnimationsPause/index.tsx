import React, { useState } from "react";
import { View } from "react-native";
import { useSharedValue, withTiming, withRepeat, Easing } from "react-native-reanimated";
import { withPause } from "react-native-redash";

import Button from "../../components/Button";

import ChatBubble from "../../components/AnimationsPauseComponents/ChatBubble";

import styles from "./style";

const AnimationsPause = () => {
    const [play, setPlay] = useState(false);
    const paused = useSharedValue(!play);
    const progress = useSharedValue<number | null>(null);

    return (
        <View style={styles.container}>
            <ChatBubble progress={progress} />
            <Button
                label={play ? "Pause" : "Play"}
                primary
                onPress={() => {
                    setPlay((prev) => !prev);
                    paused.value = !paused.value;
                    if (progress.value === null) {
                        progress.value = withPause(
                            withRepeat(withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) }), -1, true),
                            paused,
                        );
                    }
                }}
            />
        </View>
    );
};

export default AnimationsPause;
