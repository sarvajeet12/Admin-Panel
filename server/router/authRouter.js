const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/authControllers");
const signupSchema = require("../validators/authValidation");
const loginSchema = require("../validators/loginValidation");
const validate = require("../middleware/validateMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

// home page
router.route("/").get(authControllers.home);

// register page
router
    .route("/register").
    post(validate(signupSchema), authControllers.register);

// login page
router.route("/login").post(validate(loginSchema), authControllers.login);

// get user data
router.route("/user").get(authMiddleware, authControllers.user);


module.exports = router;
