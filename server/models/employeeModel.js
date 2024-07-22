import mongoose from "mongoose"
import isEmail from 'validator/lib/isEmail.js';


const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: isEmail,
            message: props => `${props.value} is not a valid email address!`
        }
    },
    mobile: {
        type: Number,
        required: true,
        unique: true
    },
    designation: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    emp_img: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const employeeModel = mongoose.models.employee || mongoose.model('employee', employeeSchema)

export default employeeModel