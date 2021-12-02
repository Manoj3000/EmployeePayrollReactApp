import './App.css';
import EmployeeFrom from './Components/EmployeeFrom';
import EmployeeList from './Components/EmployeeList';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  const [employeesArr, setEmployeesArr] = useState([]);

  const employees = JSON.parse(localStorage.getItem("employees"));

  useEffect(() => {
    if (employees != null) {
      if (employees.lenght > 0) {
        setEmployeesArr([])
      } else {
        setEmployeesArr(employees);
      }
    }
  }, [])

  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<EmployeeList employees={employeesArr} />} />
          <Route path="/add" element={<EmployeeFrom employeesArr={employeesArr} setEmployeesArr={setEmployeesArr} />} />
        </Routes>
      </div>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
