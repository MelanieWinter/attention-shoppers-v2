// Canvas.js
import { useRef, useEffect } from "react"
import Boundary from "../../../models/Boundary"
import Player from "../../../models/Player"
import { map, generateBoundaries, generatePlayer, handlePlayerMovement, updatePlayerVelocity, detectCollision } from '../../utilities/gameLogic'
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
        const boundaries = generateBoundaries(mapData, Boundary, ctx)
        const player = generatePlayer(Boundary, Player, ctx)
        const cleanup = handlePlayerMovement()

        function gameLoop() {
            function loop() {
                requestAnimationFrame(loop)
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                boundaries.forEach(boundary => {
                    boundary.draw()
                    detectCollision(boundary, player)
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
