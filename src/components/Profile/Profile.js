import './profile.scss'
import { useContext } from "react";

import pro from '../Navbar/profile.png'
import { LoginContext } from "../Auth/login/LogInContext";

export default function Profile() {
    const LoginState = useContext(LoginContext);


    return (
        <>
            <div className='kk'>

                <div className='propro'>
                    <div className="h-[140px] bg-gradient-to-r from-cyan-500 to-blue-500"></div>
                    <div className="px-5 py-2 flex flex-col gap-3 pb-6">
                        <div className="img1">
                            <img src={pro} className="immagee" />
                        </div>
                        <div className="containeeeer">
                            <div className="nameuser">
                                <h3 className="nameuser11">{LoginState.user.Name}</h3>
                                <p className="nameuser11">{LoginState.user.email}    |   {LoginState.user.Phone} **</p>
                            </div>
                        </div>

                        <div className="">

                            <div className="contaainer">
                                <div className="drop" style={{ '--clr': '#2196f3' }}>
                                    <div className="content">
                                        <h2>Deals</h2>
                                        <p style={{ marginBottom: '0px' }}><b>Total</b> Amount of Deals: <span>522</span></p>
                                        <p style={{ marginBottom: '0px' }}><b>Total</b> Count of Deals: <span>12</span></p>
                                        <a href="/deals">See More</a>
                                    </div>
                                </div>
                                <div className="drop" style={{ '--clr': '#2196f3' }}>
                                    <div className="content">
                                        <h2>ClaimedDeals</h2>
                                        <p style={{ marginBottom: '0px' }}><b>Total</b> Amount of Claimed Deals: <span>522</span></p>
                                        <p style={{ marginBottom: '0px' }}><b>Total</b> Count of Claimed Deals: <span>12</span></p>


                                        <a href="/claimeddeal">See More</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
