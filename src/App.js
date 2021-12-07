import './App.css';
import EmployeeFrom from './Components/EmployeeFrom';
import EmployeeList from './Components/EmployeeList';
import Login from './Components/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './Components/NavBar';

function App() {

  const [loginToken, setLoginToken] = useState(sessionStorage.getItem("loginToken"));

  const logout = () => {
    sessionStorage.removeItem("loginToken");
    setLoginToken("")
  }

  if (!loginToken) {
    return <Login setLoginToken={setLoginToken} />
  }

  return (
    <BrowserRouter>
      <NavBar logout={logout} />
      <div className="app">
        <Routes>
          <Route path="/" element={<EmployeeList loginToken={loginToken} />} />
          <Route path="/add" element={<EmployeeFrom loginToken={loginToken} />} />
          <Route path="/edit/:id" element={<EmployeeFrom loginToken={loginToken} />} />
        </Routes>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
      />
    </BrowserRouter>
  );
}

export default App;
