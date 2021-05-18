import { Dimensions, PixelRatio, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");
const size = width - 32;

export const r = PixelRatio.roundToNearestPixel(size / 2);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    content: {
        width: r * 2,
        height: r * 2
    }
});

export default styles;