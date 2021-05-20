import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Routes } from "./routes";
import LearnAnimations from "../screens/LearnAnimations";
import Worklets from "../screens/Worklets";
import PanGesture from "../screens/PanGesture";
import Transitions from "../screens/Transitions";
import AnimationsPause from "../screens/AnimationsPause";
import CircularSlider from "../screens/CircularSlider";
import GraphInteractions from "../screens/GraphInteractions";
import Swiping from "../screens/Swiping";

const RootStack = createStackNavigator<Routes>();

const Router = () => (
    <RootStack.Navigator>
        <RootStack.Screen name="LearnAnimations" component={LearnAnimations} options={{ title: "Learn Animations" }} />
        <RootStack.Screen name="Worklets" component={Worklets} options={{ title: "Worklets" }} />
        <RootStack.Screen name="PanGesture" component={PanGesture} options={{ title: "Pan Gesture" }} />
        <RootStack.Screen name="Transitions" component={Transitions} options={{ title: "Transitions" }} />
        <RootStack.Screen name="AnimationsPause" component={AnimationsPause} options={{ title: "Animations Pause" }} />
        <RootStack.Screen name="CircularSlider" component={CircularSlider} options={{ title: "Circular Slider" }} />
        <RootStack.Screen
            name="GraphInteractions"
            component={GraphInteractions}
            options={{ title: "Graph Interactions" }}
        />
        <RootStack.Screen name="Swiping" component={Swiping} options={{ title: "Tinder Swipe" }} />
    </RootStack.Navigator>
);

export default Router;
