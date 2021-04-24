import React from "react";
import { Image } from "react-native";

import styles from "./style";

const assets = [
    require("../../assets/card1.png"),
    require("../../assets/card2.png"),
    require("../../assets/card3.png"),
    require("../../assets/card4.png"),
    require("../../assets/card5.png"),
    require("../../assets/card6.png")
];

export enum Cards {
    Card1 = 0,
    Card2 = 1,
    Card3 = 2,
    Card4 = 3,
    Card5 = 4,
    Card6 = 5
}

export const cards = [Cards.Card1, Cards.Card2, Cards.Card3, Cards.Card4, Cards.Card5, Cards.Card6];

interface CardProps {
    card: Cards;
}

export const Card = ({ card }: CardProps) => <Image style={styles.card} source={assets[card]} />;

export default Card;
