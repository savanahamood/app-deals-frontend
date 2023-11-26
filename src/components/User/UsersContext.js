import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
import cookie from "react-cookies";
import superagent from "superagent";
export const UsersContext = React.createContext();
import  {LoginContext}  from "../Auth/login/LogInContext";

export default function UsersList(props) {
  const LoginState = useContext(LoginContext);

  const [usersList, setUsersList] = useState([]);

  //////////////////////////////////////////////////////////////////////////////////////
  //////===================================get=========================================/////
  const getFromUsersDb = async () => {
    try {
      const response = await superagent
      .get(`http://localhost:3001/users`)
      .set("authorization", `Bearer ${cookie.load("auth")}`);
      const items = response.body;
      setUsersList(items);
    } catch (error) {
      console.error(error);
    }
  };
  
  console.log("5454545",LoginState.user.id)
  const getOneUserDb = async () => {
    const userId=LoginState.user.id
    console.log(userId,"userIdIn")
    try {
      const response = await superagent
        .get(`http://localhost:3001/users/${userId}`)
        .set("authorization", `Bearer ${cookie.load("auth")}`);
        if (response.ok) {
          const items = response.body;
        // console.log(items.claimed,"items.claimed")
        // console.log(response.body,'response.body');
        
        setUsersList(items);
      }
    } catch (error) {
      console.error(error);
    }
  };





  //////////////////////////////////////////////////////////////////////////////////////
  //////===================================post=========================================/////

  const AddToUsersDb = (item) => {
    const oneUser = {
      // Server_DateTime: item.Server_DateTime,
      // DateTime_UTC: item.DateTime_UTC,
      // Update_DateTime_UTC: item.Update_DateTime_UTC,
      Name: item.Name,
      image: item.image,
      email: item.email,
      Phone: item.Phone,
      Status: item.Status,
      Gender: item.Gender,
      Date_Of_Birth: item.Date_Of_Birth,
      role: item.role,
      username: item.username,
      password: item.password,

    };
    const req = async () => {
      try {
        const response = await superagent
          .post(`http://localhost:3001/users`)
          .set("authorization", `Bearer ${cookie.load("auth")}`)
          .send(oneUser);
        if (response.ok) {
          // console.log(response.body);
          getFromUsersDb()
        }
      } catch (error) {
        console.error(error);
      }
    };
    req();
  };
  
  /////////////////////////////////////////////////////////////////////////////////////////
  //////===================================update=========================================/////

  const updateUsersInDb = async (ID,newStatus) => {
    const founedItem = usersList.filter((item) => item.id === ID);
    console.log(founedItem, "founedItem");
    const updatedItem = {
        // Server_DateTime: founedItem.Server_DateTime,
        // DateTime_UTC: founedItem.DateTime_UTC,
        // Update_DateTime_UTC: founedItem.Update_DateTime_UTC,
        Name: founedItem.Name,
        image: founedItem.image,
        email: founedItem.email,
        Phone: founedItem.Phone,
        Status: newStatus,
        Gender: founedItem.Gender,
        Date_Of_Birth: founedItem.Date_Of_Birth,
        role: founedItem.role,
        username: founedItem.username,
        password: founedItem.password,
    };
    try {
      const response = await superagent
        .put(`http://localhost:3001/users/${ID}`)
        .set("authorization", `Bearer ${cookie.load("auth")}`)
        .send(updatedItem);
      if (response.ok) {
        setUsersList((prevDeals) =>
        prevDeals.map((user) => (user.id === ID ? { ...user, Status: newStatus } : user))
      );
        console.log(response.body);
      }
    } catch (error) {
      console.error(error);
    }
  };
 
  

  /////////////////////////////////////////////////////////////////////////////////////////
  //////===================================delete=========================================/////

  const deleteUsersInDb = async (id) => {
    try {
      const response = await superagent
        .delete(`http://localhost:3001/users/${id}`)
        .set("authorization", `Bearer ${cookie.load("auth")}`);

      if (response.ok) {
        console.log(response.body);
        getFromUsersDb()

      }
    } catch (error) {
      console.error(error);
    }
  };
  

  

 
  useEffect(() => {
    getFromUsersDb();
  }, []);

  const state = {
    usersList: usersList,
    setUsersList: setUsersList,
    getFromUsersDb,
    getOneUserDb,
    AddToUsersDb,
    updateUsersInDb,
    deleteUsersInDb,
     };

  return (
    <UsersContext.Provider value={state}>
      {props.children}
    </UsersContext.Provider>
  );
}