const express = require("express");
const getAllUsersData = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const router = express.Router();


// get usersData 
router.route("/users").get(authMiddleware, adminMiddleware, getAllUsersData.getAllUsers);


// get user by id (get data of particular user)
router.route("/users/:id").get(authMiddleware, adminMiddleware, getAllUsersData.getUserById);

// update user by id (update data of particular user)
router.route("/users/update/:id").patch(authMiddleware, adminMiddleware, getAllUsersData.updateUserById);

// delete user data
router.route("/users/delete/:id").delete(authMiddleware, adminMiddleware, getAllUsersData.deleteUserById);


// get user contact details
router.route("/contacts").get(authMiddleware, adminMiddleware, getAllUsersData.getAllUsersContacts);


// delete contact data
router.route("/contacts/delete/:id").delete(authMiddleware, adminMiddleware, getAllUsersData.deleteContactById);





module.exports = router;
