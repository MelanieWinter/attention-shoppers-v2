// Canvas.js
import { useRef, useEffect } from "react"
import Boundary from "../../../models/Boundary"
import Player from "../../../models/Player"
import FoodItem from "../../../models/FoodItem"
import { map, generateMap, generatePlayer, handlePlayerMovement, updatePlayerVelocity, detectBoundaryCollision, detectFoodItemCollision } from '../../utilities/gameLogic'
import './Canvas.css'

export default function Canvas() {
    const canvasRef = useRef()

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return

        canvas.width = innerWidth
        canvas.height = innerHeight
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const mapData = map()
        const { boundaries, foodItems } = generateMap(mapData, Boundary, FoodItem, ctx)
        const player = generatePlayer(Boundary, Player, ctx)
        const cleanup = handlePlayerMovement()

        function gameLoop() {
            function loop() {
                requestAnimationFrame(loop)
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                foodItems.forEach((foodItem, idx) => {
                    foodItem.draw()
                    detectFoodItemCollision(foodItems, foodItem, idx, player)
                })
                boundaries.forEach(boundary => {
                    boundary.draw()
                    detectBoundaryCollision(boundary, player)
                })
                player.update()
                updatePlayerVelocity(player)
            }
            loop()
        }

        gameLoop()
        return cleanup
    }, []);

    return (
        <div className="Canvas">
            <canvas ref={canvasRef}></canvas>
        </div>
    );
}
