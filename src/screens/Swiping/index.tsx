import React from "react";

import { ProfileModel } from "../../components/SwipingComponents/Profile";
import Profiles from "../../components/SwipingComponents/Profiles";

export const profiles: ProfileModel[] = [
    {
        id: "1",
        name: "Caroline",
        age: 24,
        profile: require("../../assets/Profiles/1.jpg"),
    },
    {
        id: "2",
        name: "Jack",
        age: 30,
        profile: require("../../assets/Profiles/2.jpg"),
    },
    {
        id: "3",
        name: "Anet",
        age: 21,
        profile: require("../../assets/Profiles/3.jpg"),
    },
    {
        id: "4",
        name: "John",
        age: 28,
        profile: require("../../assets/Profiles/4.jpg"),
    },
    {
        id: "5",
        name: "Stephanie",
        age: 23,
        profile: require("../../assets/Profiles/5.jpg"),
    },
];

export const swipingAssets = profiles.map(({ profile }) => profile);

const Swipe = () => <Profiles {...{ profiles }} />;

export default Swipe;
