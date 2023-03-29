import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Password from "./components/Password.js";
import Username from "./components/Username.js";
import Signup from "./components/Signup.js";
import ForgotPassword from './components/ForgotPassword.js';
import Reset from "./components/Reset.js";
import Profile from "./components/Profile.js";
import Recovery from "./components/Recovery.js";
import { ProtectRoute,AuthorizedUser } from "./middleware/auth.js";



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Username />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/recovery" element={<Recovery/>}/>
        <Route path="/password" element={<ProtectRoute><Password/></ProtectRoute>}/>
        <Route path="/profile" element={<AuthorizedUser><Profile/></AuthorizedUser>}/>
      </Routes>
    </BrowserRouter>
  );
}
