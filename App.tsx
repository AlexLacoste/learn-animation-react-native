import { StatusBar } from "expo-status-bar";
import React from "react";

import LoadAssets from "./src/components/LoadAssets";
import Router from "./src/router";

const App = () => (
    <LoadAssets>
        <StatusBar style="auto" />
        <Router />
    </LoadAssets>
);

export default App;
