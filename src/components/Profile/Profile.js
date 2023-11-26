import './profile.scss'
import { useContext, useEffect, useState } from "react";
// import axios from 'axios';
import cookie from "react-cookies";
import superagent from "superagent";

import pro from '../Navbar/profile.png'
import { LoginContext } from "../Auth/login/LogInContext";
import { UsersContext } from "../User/UsersContext";
import { ClaimedDealsContext } from "../ClaimedDeals/ClaimedDealsContext";
import { DealsContext } from "../Deals/DealContext";

// import { faUserPen } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen } from '@fortawesome/free-solid-svg-icons'
export default function Profile() {
  const LoginState = useContext(LoginContext);
  const UsersState = useContext(UsersContext);
  const claimedstate = useContext(ClaimedDealsContext);
  const state = useContext(DealsContext);
  const [totalCount1, setTotalCount1] = useState(0);
  const [totalAmount1, setTotalAmount1] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  console.log(selectedImage);
  useEffect(() => {
    const totalCount = claimedstate.claimeddealList.length;
    const totalAmount = claimedstate.claimeddealList.reduce((sum, deal) => sum + parseFloat(deal.Amount), 0);
    setTotalCount(totalCount);
    setTotalAmount(totalAmount);
  }, [claimedstate.claimeddealList]);
  useEffect(() => {
    const totalCount1 = state.dealsList.length;
    const totalAmount1 = state.dealsList.reduce((sum, deal) => sum + parseFloat(deal.Amount), 0);
    setTotalCount1(totalCount1);
    setTotalAmount1(totalAmount1);
  }, [state.dealsList]);
  const upload = async (ID, selectedImage) => {
    try {
      const formData = new FormData();
      formData.append('image', selectedImage);

      const response = await superagent
        .put(`http://localhost:3001/upload/${ID}`)
        .set("authorization", `Bearer ${cookie.load("auth")}`)
        .send(formData);

      if (response.ok) {
        UsersState.setUsersList((prevUser) => ({
          ...prevUser,
          image: response.body.image,
        }));
        UsersState.getOneUserDb();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      setSelectedImage(file);
      upload(UsersState.usersList.id, file).finally(() => setLoading(false));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (LoginState.user && LoginState.user.id) {
          setLoading(true);
          const response = await UsersState.getOneUserDb();
          console.log('dddddddd', response);

          if (response.ok) {
            UsersState.setUsersList(response.body);
          }
        } else {
          console.log('User id is not available');
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [LoginState.user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className='kk'>

        <div className='propro'>
          <div className="h-[140px] bg-gradient-to-r from-cyan-500 to-blue-500"></div>
          <div className="px-5 py-2 flex flex-col gap-3 pb-6">
            <div className="img1">
            <div className="img1 position-relative">
              <img
                src={`http://localhost:3001${UsersState.usersList.image}` || pro}
                alt="User Image"
                className="immagee"
              />
              <label htmlFor="fileInput" className="file-input-label">
                <FontAwesomeIcon icon={faUserPen} className="icon-overlay" />
              </label>
              <input
                type='file'
                id="fileInput"
                name='image'
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </div>
            </div>
            <div className="containeeeer">
              <div className="nameuser">
                <h3 className="nameuser11">{UsersState.usersList.Name}</h3>
                <p className="nameuser11">{UsersState.usersList.email}    |   {UsersState.usersList.Phone} **</p>
              </div>
            </div>

            <div className="">

              <div className="contaainer">
                <div className="drop" style={{ '--clr': '#2196f3' }}>
                  <div className="content">
                    <h2>Deals</h2>
                    <p style={{ marginBottom: '0px' }}><b>Total</b> Amount of Deals: <span>{totalAmount1}</span></p>
                    <p style={{ marginBottom: '0px' }}><b>Total</b> Count of Deals: <span>{totalCount1}</span></p>
                    <a href="/deals">See More</a>
                  </div>
                </div>
                <div className="drop" style={{ '--clr': '#2196f3' }}>
                  <div className="content">
                    <h2>ClaimedDeals</h2>
                    <p style={{ marginBottom: '0px' }}><b>Total</b> Amount of Claimed Deals: <span>{totalAmount}</span></p>
                    <p style={{ marginBottom: '0px' }}><b>Total</b> Count of Claimed Deals: <span>{totalCount}</span></p>


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
