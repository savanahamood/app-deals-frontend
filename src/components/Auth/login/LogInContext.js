
import React, { useEffect, useState } from "react";
import cookie from "react-cookies";
import jwt_decode from "jwt-decode";
import superagent from "superagent";
import base64 from "base-64";
import { useNavigate } from "react-router-dom";


export const LoginContext = React.createContext();

const LoginProvider = (props) => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [user, setUser] = useState({ capabilities: [] });
  const [error, setError] = useState(null);
  


  const can = (capability) => {
    return state?.user?.capabilities?.includes(capability);
  };

  const login = async (email, password) => {

    const data = await superagent
      .post(`http://localhost:3001/signin`)
      .set(
        "authorization",
        `Basic ${base64.encode(`${email}:${password}`)}`
      );
      console.log("Login dataaaaaaaaaaaaa:", data);

    if (data.body) {
      try {
        validateToken(data.body.token);
      //   const { token, capabilities, id, ...userData } = data.body;

      // // Call setLoginState with the extracted user data
      // setLoginState(true, token, { ...userData, capabilities, id });
        navigate("/");
      } catch (e) {
        setLoginState(loggedIn, token, user, e);
        console.error(e);
        alert("amro");
      }
    }
  };

  const signup = async (email, password, role) => {
    const data = await superagent.post(
      `http://localhost:3001/signup`,
      { email: email, password: password, role: role }
    );

    if (data.body) {
      try {
        validateToken(data.body.token);
        navigate("/");
      } catch (e) {
        setLoginState(loggedIn, token, user, e);
        console.error(e);
      }
    }
  };

  const logout = () => {
    setLoginState(false, null, {});
    // window.location.reload(true);
  };

  const validateToken = (token) => {
    try {
      let validUser = jwt_decode(token);
      setLoginState(true, token, validUser);
    } catch (e) {
      setLoginState(false, null, {}, e);
      console.log("Token Validation Error", e);
    }
  };

  const setLoginState = (loggedIn, token, user, error) => {
    cookie.save("auth", token);
    setLoggedIn(loggedIn);
    setToken(token);
    setUser(user);
    setError(error || null);
  };

//   const adminArray = ["laith", "ala", "nour", "savana", "amro"];
  // let id;
  // if(user.role == 'user'||user.role == 'admin'){
  //     id = user.id;
  // } 

  
  const state = {
    loggedIn: loggedIn,
    can: can,
    login: login,
    logout: logout,
    signup: signup,
    user: user,
    token: token,
    error: error,
    // id:id||user.id,
  };

  useEffect(() => {
    const qs = new URLSearchParams(window.location.search);
    const cookieToken = cookie.load("auth");
    const token = qs.get("token") || cookieToken || null;
    validateToken(token);
  }, []);

  return (
    <LoginContext.Provider value={state}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;