import { useState } from "react"
import { Link } from "react-router-dom"
import Canvas from "../../components/Canvas/Canvas"
import Score from "../../components/Score/Score"
import "./Game.css"

export default function Game() {
    const [score, setScore] = useState(0)

    return (
        <section className="Game">
            <Link to="/">Home</Link>
            <Score score={score} setScore={setScore} />
            <Canvas score={score} setScore={setScore} />
        </section>
    )
}