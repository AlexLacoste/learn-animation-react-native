import { StyleSheet } from "react-native";

import StyleGuide from "../../StyleGuide";

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center",
        padding: StyleGuide.spacing * 4
    }
});

export default styles;
