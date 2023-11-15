import React, { useState, useEffect } from "react";
// import axios from "axios";
import cookie from "react-cookies";
import superagent from "superagent";
export const DealsContext = React.createContext();

export default function DealsList(props) {
  const [dealsList, setDealsList] = useState([]);
  console.log(dealsList)
  //////////////////////////////////////////////////////////////////////////////////////
  //////===================================get=========================================/////
  const getFromDealsDb = async () => {
    try {
      const response = await superagent
        .get(`http://localhost:3001/deal`)
        .set("authorization", `Bearer ${cookie.load("auth")}`);
      const items = response.body;
      setDealsList(items);
    } catch (error) {
      console.error(error);
    }
  };
  
  //////////////////////////////////////////////////////////////////////////////////////
  //////===================================post=========================================/////

  const AddToDealsDb = (item) => {
    const oneDeal = {
      Server_DateTime: item.Server_DateTime,
      DateTime_UTC: item.DateTime_UTC,
      Update_DateTime_UTC: item.Update_DateTime_UTC,
      Name: item.Name,
      Description: item.Description,
      Status: item.Status,
      Amount: item.Amount,
      Currency: item.Currency,
    };
    const req = async () => {
      try {
        const response = await superagent
          .post(`http://localhost:3001/deal`)
          .set("authorization", `Bearer ${cookie.load("auth")}`)
          .send(oneDeal);
        if (response.ok) {
          // console.log(response.body);
          getFromDealsDb()
        }
      } catch (error) {
        console.error(error);
      }
    };
    req();
  };
  
  /////////////////////////////////////////////////////////////////////////////////////////
  //////===================================update=========================================/////

  const updateDealsInDb = async (ID, newStatus) => {
    const founedItem = dealsList.filter((item) => item.id === ID);
    console.log(founedItem, "founedItem");
    const updatedItem = {
      Server_DateTime: founedItem.Server_DateTime,
      DateTime_UTC: founedItem.DateTime_UTC,
      Update_DateTime_UTC: founedItem.Update_DateTime_UTC,
      Name: founedItem.Name,
      Description: founedItem.Description,
      Status: newStatus,
      Amount: founedItem.Amount,
      Currency: founedItem.Currency,
    };
    
    try {
      const response = await superagent
      .put(`http://localhost:3001/deal/${ID}`)
      .set("authorization", `Bearer ${cookie.load("auth")}`)
      .send(updatedItem);
      console.log("Response from the server:", response.body);
      if (response.ok) {
        setDealsList((prevDeals) =>
        prevDeals.map((deal) => (deal.id === ID ? { ...deal, Status: newStatus } : deal))
      );
    }
    console.log(response.body);
    } catch (error) {
      console.error(error);
    }
  };
 
  

  /////////////////////////////////////////////////////////////////////////////////////////
  //////===================================delete=========================================/////

  const deleteDealsInDb = async (id) => {
    try {
      const response = await superagent
        .delete(`http://localhost:3001/deal/${id}`)
        .set("authorization", `Bearer ${cookie.load("auth")}`);

      if (response.ok) {
        console.log(response.body);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
 
  useEffect(() => {
    getFromDealsDb();

  }, []);

  const state = {
    dealsList: dealsList,
    getFromDealsDb,
    AddToDealsDb,
    updateDealsInDb,
    deleteDealsInDb,
     };

  return (
    <DealsContext.Provider value={state}>
      {props.children}
    </DealsContext.Provider>
  );
}