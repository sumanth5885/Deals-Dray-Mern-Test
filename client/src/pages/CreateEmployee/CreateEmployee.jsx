import React, { useContext, useEffect, useState } from "react";
import "./CreateEmployee.css";
import upload_img from "../../assets/upload-img.png";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";

const CreateEmployee = ({ url, setShowLogin }) => {
    const { token } = useContext(StoreContext);
    const [emp_img, setEmp_img] = useState(null);
    const navigate = useNavigate();
    const { employeeId } = useParams();
    const [data, setData] = useState({
        name: "",
        email: "",
        mobile: "",
        designation: "HR",
        gender: "",
        course: [],
    });

    const getSingleEmployee = async () => {
        try {
            const response = await axios.get(
                `${url}/api/employee/getsingleemployee?employeeId=${employeeId}`
            );
            const employee = response.data.singleEmployee;
            console.log(employee);
            setData(employee);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (employeeId) {
            getSingleEmployee();
        }
    }, [employeeId]);

    const onChangeHandler = (evt) => {
        const name = evt.target.name;
        const value = evt.target.value;

        if (name === "course") {
            const updatedCourses = [...data.course];
            if (evt.target.checked) {
                updatedCourses.push(value);
            } else {
                const index = updatedCourses.indexOf(value);
                if (index > -1) {
                    updatedCourses.splice(index, 1);
                }
            }
            setData((data) => ({ ...data, course: updatedCourses }));
        } else {
            setData((data) => ({ ...data, [name]: value }));
        }
    };

    const onSubmitHandler = async (evt) => {
        evt.preventDefault();

        try {
            if (employeeId) {
                const response = await axios.post(
                    `${url}/api/employee/update`,
                    {
                        data,
                    }
                );
                if (response.data.employee) {
                    navigate("/employee-list");
                }
            } else {
                const formData = new FormData();
                formData.append("name", data.name);
                formData.append("email", data.email);
                formData.append("mobile", data.mobile);
                formData.append("designation", data.designation);
                formData.append("gender", data.gender);
                formData.append("course", data.course);
                formData.append("emp_img", emp_img);

                const response = await axios.post(
                    `${url}/api/employee/add`,
                    formData
                );

                if (response.data.success) {
                    setData({
                        name: "",
                        email: "",
                        mobile: "",
                        designation: "HR",
                        gender: "",
                        course: [],
                    });
                    setEmp_img(null);
                    toast.success(response.data.message);
                    navigate("/employee-list");
                }
            }
        } catch (error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An error occurred while adding the employee.");
            }
        }
    };

    return !token ? (
        setShowLogin(true)
    ) : (
        <div className="create-employee">
            <form onSubmit={onSubmitHandler}>
                <div className="img-upload">
                    <p>Upload Image</p>
                    <label htmlFor="emp_img">
                        <img
                            src={
                                emp_img
                                    ? URL.createObjectURL(emp_img)
                                    : upload_img
                            }
                            alt=""
                        />
                    </label>
                    <input
                        onChange={(evt) => {
                            setEmp_img(evt.target.files[0]);
                        }}
                        type="file"
                        id="emp_img"
                        hidden
                        required
                    />
                </div>
                <div className="emp-name fields">
                    <p>Employee Name</p>
                    <input
                        onChange={onChangeHandler}
                        value={data.name}
                        type="text"
                        name="name"
                        required
                        placeholder="Type here"
                    />
                </div>
                <div className="emp-email fields">
                    <p>Employee Email</p>
                    <input
                        onChange={onChangeHandler}
                        value={data.email}
                        type="email"
                        name="email"
                        required
                        placeholder="Type here"
                    />
                </div>
                <div className="emp-mobile fields">
                    <p>Employee Mobile No</p>
                    <input
                        onChange={onChangeHandler}
                        value={data.mobile}
                        type="number"
                        name="mobile"
                        required
                        placeholder="Type here"
                    />
                </div>
                <div className="emp-designation">
                    <p>Designation</p>
                    <select onChange={onChangeHandler} name="designation" id="">
                        <option value="HR">HR</option>
                        <option value="Manager">Manager</option>
                        <option value="Sales">Sales</option>
                    </select>
                </div>
                <div className="emp-gender">
                    <p>Gender</p>
                    <div className="radio-buttons">
                        <label htmlFor="male">
                            <input
                                onChange={onChangeHandler}
                                type="radio"
                                name="gender"
                                id="male"
                                value="male"
                                required
                            />
                            Male
                        </label>
                        <label htmlFor="female">
                            <input
                                onChange={onChangeHandler}
                                type="radio"
                                name="gender"
                                id="female"
                                value="female"
                                required
                            />
                            Female
                        </label>
                    </div>
                </div>
                <div className="emp-course">
                    <p>Course</p>
                    <div className="check-boxes">
                        <label htmlFor="MCA">
                            <input
                                onChange={onChangeHandler}
                                type="checkbox"
                                name="course"
                                id="MCA"
                                value="MCA"
                            />
                            MCA
                        </label>
                        <label htmlFor="BCA">
                            <input
                                onChange={onChangeHandler}
                                type="checkbox"
                                name="course"
                                id="BCA"
                                value="BCA"
                            />
                            BCA
                        </label>
                        <label htmlFor="BSC">
                            <input
                                onChange={onChangeHandler}
                                type="checkbox"
                                name="course"
                                id="BSC"
                                value="BSC"
                            />
                            BSC
                        </label>
                    </div>
                </div>
                <button type="submit" className="emp-add-btn">
                    {employeeId ? "Update Employee" : "Add Employee"}
                </button>
            </form>
        </div>
    );
};

export default CreateEmployee;
