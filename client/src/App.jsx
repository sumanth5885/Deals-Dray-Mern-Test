import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import { Routes, Route } from "react-router-dom";
import EmployeeList from "./pages/EmployeeList/EmployeeList";
import CreateEmployee from "./pages/CreateEmployee/CreateEmployee";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SingleemployeeList from "./pages/SingleemployeeList/SingleemployeeList";

const App = () => {
    const [showLogin, setShowLogin] = useState(false);
    const url = "http://localhost:4000";
    return (
        <div>
            {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
            <Navbar setShowLogin={setShowLogin}></Navbar>
            <ToastContainer />
            <Routes>
                <Route path="/" element={<Hero />} />
                <Route
                    path="/employee-list"
                    element={<EmployeeList  setShowLogin={setShowLogin} url={url} />}
                />
                <Route
                    path="/create-employee"
                    element={<CreateEmployee setShowLogin={setShowLogin} url={url} />}
                />
                <Route
                    path="/single-employee-list/:employeeId"
                    element={<SingleemployeeList url={url} />}
                />
                <Route
                    path="/update-employee/:employeeId"
                    element={<CreateEmployee setShowLogin={setShowLogin} url={url} />}
                />
            </Routes>
        </div>
    );
};

export default App;
