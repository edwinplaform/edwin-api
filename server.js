import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from "./app/models/index.js"
import user from './app/routes/user.js'
import course from "./app/routes/course.js";
import {checkUser, requireAuth} from './app/middleware/authMiddleware.js'
const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync({ force: false })
    .then(() => {
        console.log("ok");
    })
    .catch(err =>
        console.log(err));

// app.get('*',checkUser)
app.get("/", (req, res) => {
    res.json({message: "Hello World!"});
});

app.use("/api/v1/users",user);
app.use("/api/v1/courses",course);

const PORT = process.env.PORT || 8081;
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}.`);
});