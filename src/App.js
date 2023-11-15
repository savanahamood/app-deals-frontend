import "./App.css";

import Deals from "./components/Deals/Deals";
import LogIn from "./components/Auth/login/LogIn";
import LoginContext from "./components/Auth/login/LogInContext";
import { Route, Routes } from "react-router-dom";
import DealsProvider from "./components/Deals/DealContext";
import UsersProvider from "./components/User/UsersContext";
import ClaimedDealsProvider from "./components/ClaimedDeals/ClaimedDealsContext";

import Home from './components/Home/Home'
import User from './components/User/User'
import ClaimedDeals from './components/ClaimedDeals/ClaimedDeals'
import Profile from './components/Profile/Profile'

import Navbar from './components/Navbar/Navbar'
function App() {



  return (
    <>

      <LoginContext>
        <UsersProvider>
          <DealsProvider>
            <ClaimedDealsProvider>

              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LogIn />} />
                <Route path="/users" element={<User />} />
                <Route path="/deals" element={<Deals />} />
                <Route path="/claimeddeal" element={<ClaimedDeals />} />
                <Route path="/profile" element={<Profile />} />

              </Routes>
            </ClaimedDealsProvider>
          </DealsProvider>
        </UsersProvider>

      </LoginContext>
    </>
  );
}

export default App;