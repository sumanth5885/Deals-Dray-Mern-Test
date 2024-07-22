import express from 'express';
import { addEmployee, getSingleEmployee, listEmployee, removeEmployee, updateEmployee } from '../controllers/employeeController.js';
import multer from 'multer';

const employeeRouter = express.Router()

//Image Storage Engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Define the upload directory
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({storage:storage})



employeeRouter.post("/add",upload.single("emp_img"), addEmployee)
employeeRouter.get("/list", listEmployee)
employeeRouter.post("/remove", removeEmployee)
employeeRouter.get("/getsingleemployee", getSingleEmployee)
employeeRouter.post("/update", updateEmployee)



export default employeeRouter
