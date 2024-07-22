// import { useState } from "react";
// import "./LoginPopup.css";
// import { RxCross2 } from "react-icons/rx";

// const LoginPopup = ({ setShowLogin }) => {
//     const [currState, setCurrState] = useState("Sign up");
//     return (
//         <div className="login-popup">
//             <form className="login-popup-container">
//                 <div className="popup-title">
//                     <h2>{currState}</h2>
//                     <RxCross2 onClick={() => setShowLogin(false)} />
//                 </div>
//                 <div className="popup-fields">
//                     {currState === "Sign up" && (
//                         <input type="text" placeholder="Username" required />
//                     )}
//                     <input type="email" placeholder="Your email" required />
//                     <input type="password" placeholder="Password" required />
//                 </div>
//                 <button className="sub-btn">{currState}</button>
//                 {currState === "Sign up" ? (
//                     <p className="ex-info">
//                         Already have an account? <span onClick={()=> setCurrState('Login')}>Login here</span>
//                     </p>
//                 ) : (
//                     <p className="ex-info">
//                         Create a new account? <span onClick={() => setCurrState('Sign up')}>Click here</span>
//                     </p>
//                 )}
//             </form>
//         </div>
//     );
// };

// export default LoginPopup;



import { useContext, useState } from "react";
import "./LoginPopup.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import {toast} from "react-toastify";
import { RxCross2 } from "react-icons/rx";


const LoginPopup = ({ setShowLogin }) => {
    const [currentState, setCurrentstate] = useState("Login");
    const { url, setToken, setUserName } = useContext(StoreContext);

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const onChangeHandler = (evt) => {
        const name = evt.target.name;
        const value = evt.target.value;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const onLogin = async (evt) => {
        evt.preventDefault();

        let newUrl = url;
        if (currentState === "Login") {
            newUrl += "/api/user/login";
        } else {
            newUrl += "/api/user/register";
        }

        const response = await axios.post(newUrl, data);

        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            setShowLogin(false);
            toast.success(`Welcome ${data.email}`);
            const userName = data.email.slice(0, data.email.indexOf('@'));
            setUserName(userName);
            localStorage.setItem("userName", userName);
            
        } else {
            // alert(response.data.message);
            toast.error(response.data.message);
        }
    };

    return (
        <div className="login-popup">
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currentState}</h2>
                    <RxCross2 onClick={() => setShowLogin(false)} />
                </div>
                <div className="login-popup-input">
                    {currentState !== "Login" && (
                        <input
                            name="name"
                            onChange={onChangeHandler}
                            value={data.name}
                            type="text"
                            placeholder="Your name"
                            required
                        />
                    )}
                    <input
                        name="email"
                        onChange={onChangeHandler}
                        value={data.email}
                        type="email"
                        placeholder="Your email"
                        required
                    />
                    <input
                        name="password"
                        onChange={onChangeHandler}
                        value={data.password}
                        type="password"
                        placeholder="Password"
                        required
                    />
                </div>
                <button type="submit">
                    {currentState === "Sign up" ? "Create Account" : "Login"}
                </button>
                
                {currentState === "Login" ? (
                    <p>
                        Create a new account?{" "}
                        <span
                            onClick={() => {
                                setCurrentstate("Sign up");
                            }}
                        >
                            Click here
                        </span>
                    </p>
                ) : (
                    <p>
                        Already have an account?{" "}
                        <span
                            onClick={() => {
                                setCurrentstate("Login");
                            }}
                        >
                            Login here
                        </span>
                    </p>
                )}
            </form>
        </div>
    );
};

export default LoginPopup;
