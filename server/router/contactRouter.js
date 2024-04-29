const express = require("express");
const router = express.Router();
//const validate = require("../middleware/validateMiddleware");
const contactForm = require("../controllers/contactControllers");
//const loginSchema = require("../validators/loginValidation");

// login page
router.route("/contact").post(contactForm);


module.exports = router;
