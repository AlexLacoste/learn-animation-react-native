import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    circle: {
        ...StyleSheet.absoluteFillObject,
        width: 40,
        height: 40,
        borderRadius: 40 / 2,
        borderColor: "white",
        borderWidth: 5
    }
});

export default styles;
