import './App.css';
import EmployeeFrom from './Components/EmployeeFrom';
import EmployeeList from './Components/EmployeeList';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<EmployeeList />} />
          <Route path="/add" element={<EmployeeFrom />} />
          <Route path="/edit/:id" element={<EmployeeFrom />} />
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
