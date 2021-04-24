import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RectButton, FlatList } from "react-native-gesture-handler";

import { Routes } from "../../router/routes";
import styles from "./styles";

interface learnAnimationsProps {
    screen: string;
    title: string;
    key: number;
}

const learnAnimations: ReadonlyArray<learnAnimationsProps> = [
    {
        screen: "Worklets",
        title: "👩‍🏭 Worklets",
        key: 0
    },
    {
        screen: "PanGesture",
        title: "💳 PanGesture",
        key: 1
    },
    {
        screen: "Transitions",
        title: "🔁 Transitions",
        key: 2
    }
] as const;

const LearnAnimations = () => {
    const { navigate } = useNavigation<StackNavigationProp<Routes, "LearnAnimations">>();

    return (
        <FlatList
            data={learnAnimations}
            renderItem={({ item }) => (
                <RectButton key={item.screen} onPress={() => navigate(item.screen)}>
                    <View style={styles.thumbnail}>
                        <Text style={styles.title}>{item.title}</Text>
                    </View>
                </RectButton>
            )}
            keyExtractor={( item ) => item.key.toString()}
            showsVerticalScrollIndicator={false}
        />
        // <ScrollView
        //     style={styles.container}
        //     contentContainerStyle={styles.content}
        // >
        //     {learnAnimations.map((thumbnail) => (
        //         <RectButton
        //             key={thumbnail.screen}
        //             onPress={() => navigate(thumbnail.screen)}
        //         >
        //             <View style={styles.thumbnail}>
        //                 <Text style={styles.title}>{thumbnail.title}</Text>
        //             </View>
        //         </RectButton>
        //     ))}
        // </ScrollView>
    );
};

export default LearnAnimations;