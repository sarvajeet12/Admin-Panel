require("dotenv").config();  // write when dotenv  is installed
const express = require("express");
const cors = require('cors');
const port = 5000;
const app = express();
const authRouter = require("./router/authRouter");
const contactRouter = require("./router/contactRouter");
const serviceRouter = require("./router/serviceRouter")
const adminRouter = require("./router/adminRouter");
const connectDB = require("./utils/db");
const errorMiddleware = require("./middleware/errorMiddleware");

// middleware
app.use(express.json());

// tackle cors

const corsOption = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true
};

app.use(cors(corsOption));


// End: tackle cors


// this says i am using router
//? when this line countered , it goes to router(means authRouter.js)
//* and location of all page is : localhost:port/api/auth/ (for home or root)
//* and location of all page (except contact) is : localhost:port/api/auth/routeName (for home or root)
app.use("/api/auth", authRouter);
app.use("/api/form", contactRouter);
app.use("/api/data/", serviceRouter);
app.use("/api/admin", adminRouter);





// root location (get means show and take something)
// app.get("/", (req, resp) => {
//     resp.status(200).send("Home Page");
// });

// app.get("/register", (req, resp) => {
//     resp.status(200).send("Welcome at registration page");
// })


// middleware [remember that this syntax always write above the listen]
app.use(errorMiddleware);

// If database connected successfully THEN run "app.listen"
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running at port: ${port}`);
    });
});