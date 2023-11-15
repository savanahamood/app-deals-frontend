import './BookingModal.css'
import axios from 'axios';
import { useState } from 'react';

function BookingModal({ data, open, onClose, navData  }) {

    const [userName, setUserName] = useState('');
    const [Bookdate, setBookdate] = useState('');
    const [onClickDate, setonClickDate] = useState(false);
    
    const [numberOfPpl, setnumberOfPpl] = useState(0);
   
    if (!open) return null
    const addToBookings = (e) => {
        e.preventDefault();
        const url1 = `${process.env.REACT_APP_SERVER_URL}bookrestaurant`;
        const url2 = `${process.env.REACT_APP_SERVER_URL}bookhotel`;
        const url3 = `${process.env.REACT_APP_SERVER_URL}bookactivity`;

        const bookRestData = {
            restname: data.name,
            username: userName,
            restimage: data.image,
            restaddress: numberOfPpl,
            restprice: Bookdate
        }
        const bookhotelData = {
            hotelname: data.name,
            username: userName,
            hotelimage: data.image,
            hotelprice: Bookdate,
            hotelrooms: numberOfPpl
        }
        const bookActivData = {
            activityname: data.name,
            username: userName,
            activityimage: data.image,
            activityaddress: numberOfPpl,
            activitydate: Bookdate
        }
        if (navData === 'RESTAURANTS') {
            axios.post(url1, bookRestData).then((data) => data);
        } else if (navData === 'HOTELS') {
            axios.post(url2, bookhotelData).then((data) => data);
        } else {
            axios.post(url3, bookActivData).then((data) => data);
        }
     
        onClose();
    }

    return (
        <div onClick={onClose} className={`Modal_Overlay ${open ? 'active' : ''}`}>
            <div onClick={(e) => {
                e.stopPropagation()
            }} className='Modal_Container'>
                <img className='Modal_image' src={data?.image} alt='' />
                <div className='image_Shader'></div>
                <div className='ModalRight'>
                    <p onClick={onClose} className='Close_button'>X</p>
                    <div className='RightModalContent'>
                        <h2>{data?.name}</h2>
                        <p className='Modal_descroption'>{data?.description?.substring(0, 100)}</p>
                        <form className='ModalForm' onSubmit={addToBookings}>
                            <div className='input_box'>
                                <input type='text' onChange={(event) => {
                                    setUserName(event.target.value)
                                }} />
                                <span> Full Name</span>
                            </div>
                            <div className='input_box'>
                                <input type='datetime-local' required='required' className={`${onClickDate ? 'onClickDate' : ''}`} onClick={() => setonClickDate(true)} id='date' onChange={(event) => {
                                    setBookdate(event.target.value)
                                }} />
                                <span> Booking date</span>
                            </div>
                            <div className='input_box'>
                                <input type='number' required='required' onChange={(event) => {
                                    setnumberOfPpl(event.target.value)
                                }} />
                                <span> For how many people</span>
                            </div>
                            <div className='ModalButtonContainer'>
                                <button type="submit">BOOK NOW</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default BookingModal;