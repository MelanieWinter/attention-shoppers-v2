// Canvas.js
import { useRef, useEffect } from "react";
import Boundary from "../../../models/Boundary";
import { map, generateBoundaries } from '../../utilities/gameLogic';
import './Canvas.css';

export default function Canvas() {
    const canvasRef = useRef();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.width = innerWidth;
        canvas.height = innerHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const mapData = map();
        const boundaries = generateBoundaries(mapData, Boundary, ctx);

        boundaries.forEach(boundary => boundary.draw());
    }, []);

    return (
        <div className="Canvas">
            <canvas ref={canvasRef}></canvas>
        </div>
    );
}
