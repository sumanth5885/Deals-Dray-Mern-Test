import employeeModel from "../models/employeeModel.js";
import fs from 'fs';


// add employee details

const addEmployee = async (req, res) => {
    let emp_img_filename = `${req.file.filename}`;

    const employee = new employeeModel({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        designation: req.body.designation,
        gender: req.body.gender,
        course: req.body.course,
        emp_img: emp_img_filename
    });

    try {
        await employee.save();
        res.json({
            success: true,
            message: "Employee Added"
        });
    } catch (error) {
        console.error(error);
        let errorMessage = "Employee Not Added";
        if (error.code === 11000) {  // Duplicate key error
            if (error.keyPattern.email) {
                errorMessage = "Email already exists!";
            } else if (error.keyPattern.mobile) {
                errorMessage = "Mobile number already exists!";
            }
        } else if (error.errors) {
            const keys = Object.keys(error.errors);
            errorMessage = error.errors[keys[0]].message;
        }

        res.status(400).json({
            success: false,
            message: errorMessage
        });
    }
};


// list or display employees
const listEmployee = async (req, res) => {
    try {
        const employees = await employeeModel.find({})
        res.json({
            success: true,
            data: employees
        })
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: "Error"
        })
    }
}


// remove employee
const removeEmployee = async (req, res) => {
    try {
        const employee = await employeeModel.findById(req.body.id)
        fs.unlink(`uploads/${employee.emp_img}`, () => { })

        await employeeModel.findByIdAndDelete(req.body.id)
        res.json({
            success: true,
            message: "Employee Removed"
        })
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: "Error"
        })
    }
}

// get single employee details
const getSingleEmployee = async (req, res) => {

    try {
        const { employeeId } = req.query
        const singleEmployee = await employeeModel.findById(employeeId)

        res.send({
            success: true,
            singleEmployee
        })

    } catch (error) {
        console.log(error)
    }
}


// update employee details
const updateEmployee = async (req, res) => {
    try {
        const { employeeId, name, email, mobile, designation, gender, course, createdAt } = req.body;


        const employee = await employeeModel.findByIdAndUpdate(
            employeeId,
            {
                name,
                email,
                mobile,
                designation,
                gender,
                course,
                createdAt
            },
            { new: true }  // This option returns the updated document
        );

        if (!employee) {
            return res.status(404).send({
                success: false,
                message: "Employee not found"
            });
        }

        res.send({
            success: true,
            employee
        });

    } catch (error) {
        console.error("Error in updateEmployee:", error);
        res.status(500).send({
            success: false,
            message: "Server error"
        });
    }
};


export { addEmployee, listEmployee, removeEmployee, getSingleEmployee, updateEmployee }