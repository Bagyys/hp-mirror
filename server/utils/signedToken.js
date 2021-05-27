const jwt = require("jsonwebtoken");

exports.getSignedToken = function(id, key, time) {
    return jwt.sign({ _id: id }, key, { expiresIn: time });

};