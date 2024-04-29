const User = require("../models/userModel");
const bcrypt = require("bcrypt");

// Home Page Logic

const home = async (req, resp) => {
    try {
        resp.status(200).json("<h1>Hello World!</h1>");

    } catch (error) {
        console.log(error);
    }
}
// End : Home

// Register Page Logic
const register = async (req, resp) => {
    try {
        //console.log(req.body);

        // destructuring
        const { username, email, phone, password } = req.body;

        // if email already exits
        const userExist = await User.findOne({ email });
        //* ({email : email}) <=>({email})   : JS features 
        // [first email means : it is label and second email means : email value ]
        //Example : email : abc@gmail.com

        // if
        if (userExist) {
            resp.status(400).json({ message: "email already exists" });
            return;
        }

        //else
        const userCreated = await User.create({ username, email, phone, password });

        resp.status(201).json({
            msg: userCreated, // or msg; "register successfully"
            token: await userCreated.generateToken(),
            userId: userCreated._id.toString()
        });

    } catch (error) {
        resp.status(400).json({ msg: error });
    }
}

// End  : Register 


// Login Logic

const login = async (req, resp) => {
    try {

        // since login method is post
        //* means this is email and password, is when user enter at login time 
        const { email, password } = req.body;

        // match login email and register email
        const userExist = await User.findOne({ email });
        // console.log(userExist) : if true, show all information of that data

        if (!userExist) {
            return resp.status(400).json({ message: "Invalid Credentials" });

        }

        // else 
        //* login password is passed
        const user = await userExist.comparePassword(password);

        if (user) {

            resp.status(200).json({
                msg: "login successfully",
                token: await userExist.generateToken(),
                userId: userExist._id.toString()
            });
        } else {
            resp.status(401).json({ message: "Invalid email or password" })
        }

    } catch (error) {
        resp.status(500).json(error);
        console.log(error);
    }
}
// End : Login Logic


// to send user data : userLogic
const user = async (req, resp) => {
    try {
        let userData = req.user;
        console.log(userData)
        return resp.status(200).json({ userData });

    } catch (error) {
        console.log("error from the user route", error);
    }
}


module.exports = { home, register, login, user };