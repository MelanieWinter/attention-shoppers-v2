import { Link } from "react-router-dom"
import Canvas from "../../components/Canvas/Canvas"
import "./Game.css"

export default function Game() {

    return (
        <section className="Game">
            <Link to="/">Home</Link>
            <Canvas />
        </section>
    )
}