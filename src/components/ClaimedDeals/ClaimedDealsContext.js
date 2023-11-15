import React, { useState, useEffect, useContext } from "react";
import cookie from "react-cookies";
import superagent from "superagent";
import  {LoginContext}  from "../Auth/login/LogInContext";
// import {DealsContext} from "../Deals/DealContext";

export const ClaimedDealsContext = React.createContext();

export default function ClaimedDealsProvider(props) {
  const LoginState = useContext(LoginContext);
  // const DealsState = useContext(DealsContext);
  
  
  // console.log(DealsState.dealsList.id, "/////55////////");
  // console.log(DealsState.dealsList, "/////666////////");
  
  const [isClick, setClick] = useState(false);
  const [claimeddealList, setClaimedDealList] = useState([]);
  
  // console.log(favList,"favs from context");
  //////////////////////////////////////////////////////////////////////////////////////
  //////===================================get=========================================/////
  const getFromClaimedDealsDb = async () => {
    const userId=LoginState.user.id
    console.log(userId,"u+++++****++++++++")
    try {
      const response = await superagent
        .get(`http://localhost:3001/claimeddeal/${userId}`)
        .set("authorization", `Bearer ${cookie.load("auth")}`);
        if (response.ok) {
          const items = response.body;
        // console.log(items.claimed,"items.claimed")
        // console.log(response.body,'response.body');
        
        setClaimedDealList(items.claimeddeals);
        console.log(claimeddealList,"claimeddealList");
      }
    } catch (error) {
      console.error(error);
    }
  };

  //////////////////////////////////////////////////////////////////////////////////////
  //////===================================post=========================================/////

  const AddToClaimedDealsDb = (item) => {
    setClick((prevState)=>({
      ...prevState,
      [item.id]: !prevState[item.id]
    }));
    const oneCla = {
      Amount: item.Amount,
      Currency: item.Currency,
      User_ID:LoginState.user.id,
      // Deal_ID:DealsState.dealsList.id
    };

    const req = async () => {
      try {
        const response = await superagent
          .post(`http://localhost:3001/claimeddeal`)
          .set("authorization", `Bearer ${cookie.load("auth")}`)
          .send(oneCla);
        if (response.ok) {
          console.log(response.body,"addddddddded");
          getFromClaimedDealsDb();
        // console.log(favList,"favList");

        }
      } catch (error) {
        console.error(error);
      }
    };
    req();
  };

  /////////////////////////////////////////////////////////////////////////////////////////
  //////===================================delete=========================================/////

  const deleteFromClaimedDealsDb = async (item) => {

    try {
      const response = await superagent
        .delete(`http://localhost:3001/claimeddeal/${item}`)
        .set("authorization", `Bearer ${cookie.load("auth")}`);

      if (response.ok) {
        console.log(response.body);
      }
      getFromClaimedDealsDb();
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    getFromClaimedDealsDb();
  }, []);

  const state = {
    claimeddealList: claimeddealList,
    getFromClaimedDealsDb,
    deleteFromClaimedDealsDb,
    AddToClaimedDealsDb,
    isClick:isClick,
  };

  return (
    <ClaimedDealsContext.Provider value={state}>
      {props.children}
    </ClaimedDealsContext.Provider>
  );
}