// Canvas.js
import { useRef, useEffect } from "react"
import Boundary from "../../../models/Boundary"
import Player from "../../../models/Player"
import FoodItem from "../../../models/FoodItem"
import { map, generateMap, generatePlayer, handlePlayerMovement, updatePlayerVelocity, detectBoundaryCollision, handleGrabItem } from '../../utilities/gameLogic'
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
                for (let i = foodItems.length - 1; i >= 0; i--) {
                    const foodItem = foodItems[i]
                    foodItem.draw()
                    handleGrabItem(foodItems, foodItem, i, player)
                }
                    

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
