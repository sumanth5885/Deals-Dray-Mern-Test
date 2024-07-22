import "./SingleemployeeList.css";
import { FaUserEdit } from "react-icons/fa";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";

const SingleemployeeList = ({ url }) => {
    const { employeeId } = useParams();
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    const getSingleEmployee = async () => {
        try {
            const response = await axios.get(
                `${url}/api/employee/getsingleemployee?employeeId=${employeeId}`
            );
            setEmployee(response.data.singleEmployee);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getSingleEmployee();
    }, [employeeId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!employee) {
        return <div>Employee not found</div>;
    }

    return (
        <div className="single-employee-list">
            <img
                src={`${url}/images/`+employee.emp_img}
                alt="Employee"
            />
            <div className="info">
                <p>{employee.name}</p>
                <p>{employee.email}</p>
                <p>{employee.mobile}</p>
                <p>{employee.designation}</p>
                <p>{employee.gender}</p>
                <p>{employee.course}</p>
                <p>{new Date(employee.createdAt).toLocaleDateString()}</p>
                <p>
                    <FaUserEdit onClick={()=> navigate(`/update-employee/${employee._id}`)} size={20} />
                </p>
            </div>
        </div>
    );
};

export default SingleemployeeList;
