import { StatusBar } from "expo-status-bar";
import React from "react";
import Worklets from "./src/screens/Worklets";

export default function App() {
    return (
        <>
            <StatusBar style="auto" />
            <Worklets />
        </>
    );
}
