import { useNavigate } from 'react-router-dom'
import './Splash.css'

export default function Splash() {
    const navigate = useNavigate()
    
    const handleButtonClick = () => {
        navigate('/lobby')
    }

    return (
        <section className='Splash'>
            <h1>Attention Shoppers</h1>
            <button onClick={handleButtonClick}>
                Ready to play?
            </button>
        </section>
    );
}
