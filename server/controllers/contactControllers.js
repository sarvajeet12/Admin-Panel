// contact page Logic
const Contact = require("../models/contactModel");

const contactForm = async (req, resp) => {
    try {
        console.log(req.body);
        const response = req.body;
        await Contact.create(response);
        return resp.status(200).send({ message: "message send successfully" });
    } catch (error) {
        return resp.status(500).send({ message: "message not delivered" });
    }
}

module.exports = contactForm;