import React, { useCallback, useRef, useState } from "react";
import { SafeAreaView, View } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";

import Animated, { useSharedValue } from "react-native-reanimated";
import { ProfileModel } from "../Profile";
import Swipeable, { SwipeHandler } from "../Swipeable";

import styles from "./style";

interface ProfilesProps {
    profiles: ProfileModel[];
}

const Profiles = ({ profiles: defaultProfiles }: ProfilesProps) => {
    const topCard: React.RefObject<SwipeHandler> = useRef<SwipeHandler>(null);
    const scale: Animated.SharedValue<number> = useSharedValue(1);
    const [profiles, setProfiles] = useState(defaultProfiles);
    const onSwipe = useCallback(() => {
        setProfiles(profiles.slice(0, profiles.length - 1));
    }, [profiles]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Icon name="user" size={32} color="gray" />
                <Icon name="message-circle" size={32} color="gray" />
            </View>
            <View style={styles.cards}>
                {profiles.map((profile, index) => {
                    const onTop: boolean = index === profiles.length - 1;
                    const ref: React.RefObject<SwipeHandler> | null = onTop ? topCard : null;
                    return (
                        <Swipeable
                            scale={scale}
                            key={profile.id}
                            profile={profile}
                            onSwipe={onSwipe}
                            onTop={onTop}
                            ref={ref}
                        />
                    );
                })}
            </View>
            <View style={styles.footer}>
                <RectButton
                    style={styles.circle}
                    onPress={() => {
                        topCard.current?.swipeLeft();
                    }}
                >
                    <Icon name="x" size={32} color="#ec5288" />
                </RectButton>
                <RectButton
                    style={styles.circle}
                    onPress={() => {
                        topCard.current?.swipeRight();
                    }}
                >
                    <Icon name="heart" size={32} color="#6ee3b4" />
                </RectButton>
            </View>
        </SafeAreaView>
    );
};

export default Profiles;
