import React from "react";
import { SafeAreaView, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";

import StyleGuide from "../StyleGuide";
import Text from "../Text";
import styles from "./style";

interface ButtonProps {
    label: string;
    primary?: boolean;
    onPress: () => void;
}

const Button = ({ label, primary, onPress }: ButtonProps) => {
    const color = primary ? "white" : undefined;
    const backgroundColor = primary ? StyleGuide.palette.primary : undefined;

    return (
        <RectButton {...{ onPress }}>
            <SafeAreaView style={{ backgroundColor }}>
                <View style={styles.container}>
                    <Text type="headline" style={[styles.label, { color }]}>
                        {label}
                    </Text>
                </View>
            </SafeAreaView>
        </RectButton>
    );
};

export default Button;
