
const bcrypt = require("bcryptjs");
const Users = require("../users/user-model.js")

module.exports = authenticate;

function authenticate(req, res, next) {

    if (req.session && req.session.username) {
        next()
    } else {
        res.status(401).json({ message: "No username or must LOG-IN again" })
    }
};

