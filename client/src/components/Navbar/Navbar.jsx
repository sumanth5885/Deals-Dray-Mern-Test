import "./Navbar.css";
import logo from "../../assets/MERN-transparent.png";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
    const { token, userName, handleLogout } =
        useContext(StoreContext);
        const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
    };
    return (
        <div className="navbar">
            <div className="nav-left">
                <Link to="/">
                    <img src={logo} alt="" />
                </Link>
            </div>
            <div className="nav-middle">
                <ul className="menu-items">
                    <NavLink to="/">
                        <li>Home</li>
                    </NavLink>
                    <NavLink to="/employee-list">
                        <li>Employee List</li>
                    </NavLink>
                    <NavLink to="/create-employee">
                        <li>Create Employee</li>
                    </NavLink>
                </ul>
            </div>
            {!token ? (
                <div className="nav-right">
                    <button
                
                        onClick={() => {
                            setShowLogin(true);
                        }}
                    >
                        Sign in
                    </button>
                </div>
            ) : (
                <div className="nav-right">
                    <p className="user-name">{userName}</p>
                    <button onClick={handleLogout}>Logout</button>
                    
                </div>
            )}
        </div>
    );
};

export default Navbar;
