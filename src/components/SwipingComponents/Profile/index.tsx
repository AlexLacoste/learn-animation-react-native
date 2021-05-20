import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useDerivedValue } from "react-native-reanimated";
import styles from "./style";

export interface ProfileModel {
    id: string;
    name: string;
    age: number;
    profile: number;
}

const { width } = Dimensions.get("window");

export const α: number = Math.PI / 12;

interface CardProps {
    profile: ProfileModel;
    onTop: boolean;
    translateX: Animated.SharedValue<number>;
    translateY: Animated.SharedValue<number>;
    scale: Animated.SharedValue<number>;
}

const Profile = ({ profile, onTop, translateX, translateY, scale }: CardProps) => {
    const x = useDerivedValue(() => (onTop ? translateX.value : 0));
    const style = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateX.value },
            { translateY: translateY.value },
            {
                rotate: `${interpolate(
                    x.value,
                    [-width / 2, 0, width / 2],
                    [α, 0, -α],
                    Extrapolate.CLAMP,
                )}rad`,
            },
            { scale: scale.value },
        ],
    }));
    const likeStyle = useAnimatedStyle(() => ({
        opacity: interpolate(x.value, [0, width / 4], [0, 1], Extrapolate.CLAMP),
    }));
    const nopeStyle = useAnimatedStyle(() => ({
        opacity: interpolate(x.value, [-width / 4, 0], [1, 0], Extrapolate.CLAMP),
    }));

    return (
        <Animated.View style={[StyleSheet.absoluteFill, style]}>
            <Image style={styles.image} source={profile.profile} />
            <View style={styles.overlay}>
                <View style={styles.header}>
                    <Animated.View style={[styles.like, likeStyle]}>
                        <Text style={styles.likeLabel}>LIKE</Text>
                    </Animated.View>
                    <Animated.View style={[styles.nope, nopeStyle]}>
                        <Text style={styles.nopeLabel}>NOPE</Text>
                    </Animated.View>
                </View>
                <View>
                    <Text style={styles.name}>{profile.name}</Text>
                </View>
            </View>
        </Animated.View>
    );
};

export default Profile;
