import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Text, View } from "react-native";
import { FlatList, RectButton } from "react-native-gesture-handler";
import { Routes } from "../../router/routes";
import styles from "./style";

interface learnAnimationsProps {
    screen: string;
    title: string;
    key: number;
}

const learnAnimations: ReadonlyArray<learnAnimationsProps> = [
    {
        screen: "Worklets",
        title: "👩‍🏭 Worklets",
        key: 0,
    },
    {
        screen: "PanGesture",
        title: "💳 PanGesture",
        key: 1,
    },
    {
        screen: "Transitions",
        title: "🔁 Transitions",
        key: 2,
    },
    {
        screen: "AnimationsPause",
        title: "🐎 AnimationsPause",
        key: 3,
    },
    {
        screen: "CircularSlider",
        title: "⭕️ Circular Slider",
        key: 4,
    },
    {
        screen: "GraphInteractions",
        title: "📈 Graph Interactions",
        key: 5,
    },
    {
        screen: "Swiping",
        title: "💚 Swiping",
        key: 6,
    },
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
            keyExtractor={(item) => item.key.toString()}
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
