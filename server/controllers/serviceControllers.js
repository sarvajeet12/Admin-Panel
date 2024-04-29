const Service = require("../models/serviceModel");

const service = async (req, resp) => {
    try {
        const response = await Service.find();
        if (!response) {
            //Handle the case where no document was found
            resp.status(404).send({ msg: "No services were found" });
        }

        resp.status(200).send({ msg: response });
    } catch (error) {
        console.log("serviceControllers Error: ", error);
    }
}

module.exports = service;