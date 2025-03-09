import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from "./app/models/index.js"
import user from './app/routes/user.js'
import appointment from "./app/routes/appointment.js";
import session from "./app/routes/session.js";
import invoice from "./app/routes/invoice.js";
import review from "./app/routes/review.js";
import auth from "./app/routes/auth.js";
const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

db.sequelize.sync({alter: false, force: false})
    .then(() => {
        console.log("Tables and models synced successfully!");
    })
    .catch(err =>
        console.log(err));

app.get("/", (req, res) => {
    res.json({message: "Hello World!"});
});

app.use("/api/v1/users", user);
app.use("/api/v1/auth", auth);
app.use("/api/v1/appointments", appointment);
app.use("/api/v1", session);
app.use("/api/v1", invoice);
app.use("/api/v1", review);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}.`);
});