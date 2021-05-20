import { StyleSheet } from "react-native";

import StyleGuide from "../../StyleGuide";

const size = 32;
const styles = StyleSheet.create({
    bubble: {
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: StyleGuide.palette.primary,
    },
});

export default styles;
