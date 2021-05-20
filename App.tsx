import { StatusBar } from "expo-status-bar";
import React from "react";

import LoadAssets from "./src/components/LoadAssets";
import { swipingAssets } from "./src/screens/Swiping";

import Router from "./src/router";

const assets = [...swipingAssets];

const App = () => (
    <LoadAssets assets={assets}>
        <StatusBar style="auto" />
        <Router />
    </LoadAssets>
);

export default App;
