import { StyleSheet } from "react-native";
import StyleGuide from "../../StyleGuide";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: StyleGuide.palette.background,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 16,
    },
    cards: {
        flex: 1,
        marginHorizontal: 16,
        zIndex: 100,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        padding: 16,
    },
    circle: {
        width: 64,
        height: 64,
        borderRadius: 32,
        padding: 12,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        // shadowColor: "gray",
        // shadowOffset: { width: 1, height: 1 },
        // shadowOpacity: 0.18,
        // shadowRadius: 2
    },
});

export default styles;
