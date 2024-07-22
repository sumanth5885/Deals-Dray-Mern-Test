import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const url = "http://localhost:4000";
    const navigate = useNavigate()

    const [token, setTokenState] = useState(
        localStorage.getItem("token") || ""
    );
    const [userName, setUserNameState] = useState(
        localStorage.getItem("userName") || ""
    );

    const setToken = (newToken) => {
        setTokenState(newToken);
        localStorage.setItem("token", newToken);
        
    };

    const setUserName = (newUserName) => {
        setUserNameState(newUserName);
        localStorage.setItem("userName", newUserName);
    };





    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        setToken("");
        setUserName("");
        navigate("/")
    };

 

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
        }
        if (localStorage.getItem("userName")) {
            setUserName(localStorage.getItem("userName")); // Retrieve userName from localStorage
        }

        
    }, []);

    const contextValue = {
        
        url,
        token,
        setToken,
        userName,
        setUserName,
        handleLogout,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
