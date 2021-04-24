import { Dimensions, StyleSheet } from "react-native";


const { width: wWidth } = Dimensions.get("window");
const width = wWidth * 0.8;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        height: width,
        width,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: "#d3d3d3",
        borderTopLeftRadius: width / 2,
        borderTopRightRadius: width / 2,
        borderBottomLeftRadius: width / 2
    }
});

export default styles;