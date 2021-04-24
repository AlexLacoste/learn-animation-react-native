import React, { useState } from "react";
import { View, LayoutRectangle } from "react-native";

import CardPanGesture from "../../components/CardPanGesture";
import styles from "./style";

const PanGesture = () => {
    const [container, setContainer] = useState<null | LayoutRectangle>(null);

    return (
        <View style={styles.container} onLayout={({ nativeEvent: { layout } }) => setContainer(layout)}>
            {container && <CardPanGesture {...container} />}
        </View>
    );
};

export default PanGesture;
