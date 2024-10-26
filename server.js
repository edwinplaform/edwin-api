import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from "./app/models/index.js"
import user from './app/routes/user.js'
import student from "./app/routes/student.js";
// import {checkUser, requireAuth} from './app/middleware/authMiddleware.js'
const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync({ alter: true })
    .then(() => {
        console.log("Tables and models synced successfully!");
    })
    .catch(err =>
        console.log(err));

// app.get('*',checkUser)
app.get("/", (req, res) => {
    res.json({message: "Hello World!"});
});

app.use("/api/v1/users",user);
app.use("/api/v1/students",student);

const PORT = process.env.PORT || 8081;
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}.`);
});