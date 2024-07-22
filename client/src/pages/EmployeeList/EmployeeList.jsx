import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./EmployeeList.css";
import empty_list from "../../assets/empty-list.jpg";
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const EmployeeList = ({ url, setShowLogin }) => {
    const [emp_list, setEmpList] = useState([]);
    const navigate = useNavigate();
    const {token} = useContext(StoreContext)

    const fetchList = async () => {
        const response = await axios.get(`${url}/api/employee/list`);
        if (response.data.success) {
            setEmpList(response.data.data);
        } else {
            toast.error("Error");
        }
    };

    const removeEmployee = async (employeeId) => {
        const response = await axios.post(`${url}/api/employee/remove`, {
            id: employeeId,
        });
        await fetchList();
        if (response.data.success) {
            toast.success(response.data.message);
        } else {
            toast.error("Error");
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    return !token ? (
        setShowLogin(true)
    ) : (
        <div className="employee-list">
            <h1>Employee List</h1>
            {emp_list.length > 0 ? (
                <div className="list-table">
                    <div className="list-table-format">
                        <b>Image</b>
                        <b>Name</b>
                        <b>Email</b>
                        <b>Mobile No</b>
                        <b>Designation</b>
                        <b>Gender</b>
                        <b>Course</b>
                        <b>Created Date</b>
                        <b>Action</b>
                    </div>
                    {emp_list.map((employee, i) => {
                        return (
                            <div
                                onClick={() =>
                                    navigate(`/single-employee-list/${employee._id}`)
                                }
                                key={i}
                                className="list-table-format"
                            >
                                <img
                                    src={`${url}/images/` + employee.emp_img}
                                    alt=""
                                />
                                <p>{employee.name}</p>
                                <p>{employee.email}</p>
                                <p>{employee.mobile}</p>
                                <p>{employee.designation}</p>
                                <p>{employee.gender}</p>
                                <p>{employee.course}</p>
                                <p>
                                    {new Date(
                                        employee.createdAt
                                    ).toLocaleDateString()}
                                </p>
                                <p className="action">
                                    <FaUserEdit
                                        size={20}
                                        onClick={() =>
                                            navigate(`/single-employee-list/${employee._id}`)
                                        }
                                    />
                                    <MdDelete
                                        onClick={() =>
                                            removeEmployee(employee._id)
                                        }
                                        size={20}
                                    />
                                </p>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="empty-employee-list">
                    <img src={empty_list} alt="" />
                    <p>Empty Employee List</p>
                </div>
            )}
        </div>
    );
};

export default EmployeeList;
