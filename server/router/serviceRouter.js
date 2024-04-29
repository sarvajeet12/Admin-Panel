const express = require("express");
const service = require("../controllers/serviceControllers");
const router = express.Router();


// service page
router.route("/service").get(service);


module.exports = router;
