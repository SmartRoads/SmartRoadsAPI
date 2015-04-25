var express = require("express");


module.exports = function(config) {

    var router = express.Router();

    router.post('/login', function(req, res) {
        res.contentType("application/json");

    });

    router.post('/register', function(req, res) {
        res.contentType("application/json");
    });

    return router;
}
