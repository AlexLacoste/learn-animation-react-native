import { StyleSheet } from 'react-native';
import StyleGuide from "../../StyleGuide";

const styles = StyleSheet.create({
    date: {
        ...StyleGuide.typography.title3,
        textAlign: "center"
    },
    price: {
        ...StyleGuide.typography.title2,
        textAlign: "center"
    }
});

export default styles;