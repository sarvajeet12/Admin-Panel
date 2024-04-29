const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authMiddleware = async (req, resp, next) => {
    const token = req.header("Authorization");
    console.log("authMiddleware token : ", token);

    if (!token) {
        console.log("token not found")
        return resp.status(401).json({ message: "Unauthorized HTTP, Token not provided" });
    }


    //* Assuming  the token is in this format Bearer <jwtToken>, Removing the "Bearer" and "one Space".

    const jwtToken = token.replace("Bearer", "").trim();

    try {

        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY)

        const userData = await User.findOne({ email: isVerified.email }).select({ password: 0 });

        //console.log("data isVerified", userData);

        req.user = userData;
        req.token = token;
        req.userId = userData._id;
        next();
    } catch (error) {
        return resp.status(401).json({ message: "Unauthorized HTTP, Token not provided" });
    }


};

module.exports = authMiddleware;