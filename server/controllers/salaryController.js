const UserModel = require('../models/Users');

// Create User
const createuser = (req, res) => {
    UserModel.create(req.body)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            console.error("Error creating user:", err);
            res.status(500).json({ error: "An error occurred while creating user." });
        });
}

module.exports = {   
    createuser
}