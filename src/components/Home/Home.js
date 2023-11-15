import './home.scss'
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();

    const handleSignUpClick = () => {
      // Navigate to the "/login" route
      navigate('/login');
    };
    return (
        <>

            <div className='heroo'>
                <div className="overlay">
                    <h1>Simply The Best</h1>
                    <h3>Top Deals Await You</h3>

                    <h4>Reasons for Choosing US</h4>
                    <p>Welcome to Simply The Best your go-to platform for all things deals! Immerse yourself in a world of unbeatable offers, where savings meet convenience. Our app is designed to revolutionize your shopping experience, providing a seamless journey into the realm of exclusive deals and discounts.</p>
                    <br />
                    <button onClick={handleSignUpClick}>Sign Up</button>
                </div>
            </div>

        </>
    )
}
