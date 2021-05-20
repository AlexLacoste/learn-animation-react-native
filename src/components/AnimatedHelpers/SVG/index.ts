/// <reference path="index.d.ts"/>

import parseSVG from "parse-svg-path";
import absSVG from "abs-svg-path";
import normalizeSVG from "normalize-svg-path";
import { cubicBezier, Vector } from "react-native-redash";

import { cubicBezierLength } from "../Bezier";

type SVGMove = ["M", number, number];
type SVGCurve = ["C", number, number, number, number, number, number];
type SVGPath = [SVGMove, ...SVGCurve[]];

export interface BezierCurve {
    from: Vector;
    to: Vector;
    c1: Vector;
    c2: Vector;
    start: number;
    end: number;
}

export interface PathInterface {
    curves: BezierCurve[];
    length: number;
}

export const parsePath = (d: string): PathInterface => {
    let length = 0;
    const [move, ...rawCurves]: SVGPath = normalizeSVG(absSVG(parseSVG(d)));
    const curves: BezierCurve[] = rawCurves.map((curve, index) => {
        const prevCurve = rawCurves[index - 1];
        const from = index === 0 ? { x: move[1], y: move[2] } : { x: prevCurve[5], y: prevCurve[6] };
        const c1 = { x: curve[1], y: curve[2] };
        const c2 = { x: curve[3], y: curve[4] };
        const to = { x: curve[5], y: curve[6] };
        const start = length;
        length += cubicBezierLength(from, c1, c2, to);
        const end = length;
        return {
            from,
            c1,
            c2,
            to,
            start,
            end,
        };
    });
    return {
        length,
        curves,
    };
};

export const getPointAtLength = (path: PathInterface, length: number) => {
    "worklet";

    const c = path.curves.find((curve) => length >= curve.start && length <= curve.end);
    if (!c) {
        throw new Error("Curve not found");
    }
    const t = (length - c.start) / (c.end - c.start);
    return {
        x: cubicBezier(t, c.from.x, c.c1.x, c.c2.x, c.to.x),
        y: cubicBezier(t, c.from.y, c.c1.y, c.c2.y, c.to.y),
    };
};
