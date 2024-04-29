// user model
const User = require("../models/userModel");

// contact model
const Contact = require("../models/contactModel");


//*---------------------------------------------------------  User Logic
const getAllUsers = async (req, resp) => {
    try {
        const users = await User.find({}, { password: 0 }); // Exclude password field from response
        //console.log(users)
        if (!users || users.length === 0) {
            resp.status(404).send({ message: "No Users Found" });
            return;
        }
        resp.status(200).send(users);
        return;
    } catch (error) {
        next(error);
    }
}


//*--------------------------------------------------- delete single user
const deleteUserById = async (req, resp) => {
    try {
        const id = req.params.id;
        // [ _id means: database id ] and [id means : person click delete button] 
        const result = await User.deleteOne({ _id: id });
        if (!result) {
            resp.status(404).send({ message: 'User not found' })
        } else {
            resp.status(200).send({ message: "User Deleted Successfully" });
        }
    } catch (error) {
        next(error)
    }
}

//*--------------------------------------------------  get single user data for update

const getUserById = async (req, resp) => {
    try {
        const id = req.params.id;
        const usersById = await User.findOne({ _id: id }, { password: 0 }); // Exclude password field from response
        //console.log(usersById)
        resp.status(200).send(usersById);
        return;
    } catch (error) {
        next(error);
    }
}


//*--------------------------------------------------update single user data

const updateUserById = async (req, resp) => {
    try {
        const id = req.params.id;
        const updatesUserData = req.body;
        let updatedData = await User.updateOne({ _id: id }, { $set: updatesUserData });
        resp.status(200).send(updatedData);
        return;
    } catch (error) {
        next(error);
    }
}


//*---------------------------------------------------------  Contact Logic

const getAllUsersContacts = async (req, resp) => {
    try {
        const contacts = await Contact.find(); // Exclude password field from response
        //console.log(contacts)  // show all contacts data
        if (!contacts || contacts.length === 0) {
            resp.status(404).send({ message: "No Users Found" });
            return;
        }
        resp.status(200).send(contacts);
        return;
    } catch (error) {
        next(error);
    }
}


//*--------------------------------------------------- delete single contact
const deleteContactById = async (req, resp) => {
    try {
        const id = req.params.id;
        // [ _id means: database id ] and [id means : person click delete button] 
        const result = await Contact.deleteOne({ _id: id });
        if (!result) {
            resp.status(404).send({ message: 'User not found' })
        } else {
            resp.status(200).send({ message: "User Deleted Successfully" });
        }
    } catch (error) {
        next(error)
    }
}





module.exports = { getAllUsers, getAllUsersContacts, deleteUserById, getUserById, updateUserById, deleteContactById };