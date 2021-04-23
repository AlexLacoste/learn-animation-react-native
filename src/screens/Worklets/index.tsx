import React, { Dispatch, SetStateAction, useState } from "react";
import { View, Platform, Text } from "react-native";
import Animated, { runOnJS, runOnUI, useSharedValue } from "react-native-reanimated";
import { ReText } from "react-native-redash";

import Button from "../../components/Button";
import styles from "./style";

const formatDatetime = (datetime: Date): string => {
    "worklet";

    return `${datetime.getFullYear()}-${
        datetime.getMonth() + 1
    }-${datetime.getDate()} ${datetime.getHours()}:${datetime.getMinutes()}:${datetime.getSeconds()}`;
};

const sayHello = (text: Animated.SharedValue<string>, from: string, cb: () => void): void => {
    "worklet";

    text.value = `Hello from ${from}(${Platform.OS}) at ${formatDatetime(new Date())}`;
    runOnJS(cb)();
};

const Worklets = () => {
    const [jsText, setJsText]: [string, Dispatch<SetStateAction<string>>] = useState("");
    const text: Animated.SharedValue<string> = useSharedValue("");
    const sayHelloOnTheJSThread = (): void => setJsText(`Hello world at ${formatDatetime(new Date())}`);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>JS thread says:</Text>
            <Text style={styles.text}>{jsText}</Text>
            <Button
                onPress={() => runOnUI(sayHello)(text, "France", sayHelloOnTheJSThread)}
                label="Say Hello"
                primary
            />
            <Text style={styles.text}>UI thread says:</Text>
            <ReText {...{ text }} style={styles.text} />
        </View>
    );
};

export default Worklets;
