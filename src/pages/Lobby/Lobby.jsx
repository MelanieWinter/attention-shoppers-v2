import { Link, useNavigate } from "react-router-dom"
import './Lobby.css'

export default function Lobby() {
    const navigate = useNavigate()

    const handleButtonClick = () => {
        navigate('/game')
    }

    return (
        <section className="Lobby">
            <Link to="/">Home</Link>
            <div>
                <h2>Players</h2>
                <ul>
                    <li>User</li>
                </ul>
            </div>
            <button onClick={handleButtonClick}>
                Start Game
            </button>
        </section>
    )
}