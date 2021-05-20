import { StyleSheet } from "react-native";

import StyleGuide from "../../components/StyleGuide";

const styles = StyleSheet.create({
    container: {
        backgroundColor: StyleGuide.palette.background,
    },
    content: {
        paddingBottom: 32,
    },
    thumbnail: {
        backgroundColor: "white",
        padding: StyleGuide.spacing * 2,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: StyleGuide.palette.background,
    },
    title: {
        ...StyleGuide.typography.headline,
    },
});

export default styles;
