// Canvas.js
import { useRef, useEffect } from "react"
import Boundary from "../../../models/Boundary"
import Player from "../../../models/Player"
import FoodItem from "../../../models/FoodItem"
import Employee from "../../../models/Employee"
import { map, generateMap, generatePlayer, handlePlayerMovement, updatePlayerVelocity, detectPlayerBoundaryCollision, handleGrabItem, generateEmployees, detectEmployeeBoundaryCollision } from '../../utilities/gameLogic'
import './Canvas.css'

export default function Canvas({ score, setScore }) {
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
        const employees = generateEmployees(Boundary, Employee, ctx)
        const player = generatePlayer(Boundary, Player, ctx)
        const cleanup = handlePlayerMovement()

        function gameLoop() {
            function loop() {
                requestAnimationFrame(loop)
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                for (let i = foodItems.length - 1; i >= 0; i--) {
                    const foodItem = foodItems[i]
                    foodItem.draw()
                    handleGrabItem(foodItems, foodItem, i, player, score, setScore)
                }

                boundaries.forEach(boundary => {
                    boundary.draw()
                    detectPlayerBoundaryCollision(boundary, player)
                })
                player.update()
                updatePlayerVelocity(player, boundaries)

                employees.forEach(employee => {
                    employee.update()
                    const collisions = []
                    boundaries.forEach(boundary => {
                        detectEmployeeBoundaryCollision(boundary, employee, collisions)
                    })
                    if (collisions.length > employee.prevCollisions.length) {
                        employee.prevCollisions = collisions
                        console.log(employee.prevCollisions)
                    }

                    if (JSON.stringify(collisions) !== JSON.stringify(employee.prevCollisions)) {
                        
                    }
                })
            }
            loop()
        }

        gameLoop()
        return cleanup
    }, [])
    return (
        <div className="Canvas">
            <canvas ref={canvasRef}></canvas>
        </div>
    )
}
