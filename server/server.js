import express from "express"
import cors from 'cors'
import { connectDB } from "./config/db.js"
import employeeRouter from "./routes/employeeRoute.js"
import userRouter from './routes/userRoute.js'
import 'dotenv/config'



//app config
const app = express()
const port = 4000


//middleware
app.use(express.json())
app.use(cors())

//DB Connection
connectDB()

//API endpoints
app.use("/api/employee", employeeRouter)
app.use("/images", express.static("uploads"))
app.use("/api/user", userRouter);





app.get("/", (req, res) => {
    res.send("API working")
})


app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`)
})