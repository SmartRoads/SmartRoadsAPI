var express = require("express");
var paypal = require('paypal-rest-sdk');
var braintree = require('braintree');
var crypto = require("crypto");
var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "53wnfzh6mhb9dcgm",
  publicKey: "dpthfg9z9v2498v3",
  privateKey: "4a15dd96b850543721ef8fdf7df03984"
});

function hash(input) {
  if (input !== undefined) {
    var hash = crypto.createHash("sha256");
    hash.update(input,"utf8");
    return hash.digest("base64");
  } else {
    return undefined;
  }
};

module.exports = function(config) {

    var router = express.Router();

    router.get("/token", function (req, res) {
      gateway.clientToken.generate({}, function (err, response) {
        var clientToken = response.clientToken;
        res.status(200).send(clientToken);
      });
    });

    router.post('/login', function(req, res) {
        res.contentType("application/json");
        var email = req.body.email;
        var password = req.body.password;

        var col = config.db.collection(config.DBCOLLECTIONS.USERS);

        col.findOne({"email":email, "password": hash(password)}, function(err, user) {
            if (err) {
              res.status(500).send("{\"error\":\"database connection fail\"}");
            } else if (!user){
              res.status(200).send({error: "Incorrect login"});
            } else {
              res.status(200).send({token: user.token});
            }
        });
    });

    router.post('/register', function(req, res) {
        res.contentType("application/json");
        var email = req.body.email;
        var password = hash(req.body.password);
        var nonce = req.body.payment_method_nonce;
        var col = config.db.collection(config.DBCOLLECTIONS.USERS);
        col.findOne({"email":email, "password": hash(password)}, function(err, user) {
            if (err) {
              res.status(500).send("{\"error\":\"database connection fail\"}");
            } else if (!user){
              gateway.transaction.sale({
                amount: '10.00',
                paymentMethodNonce: nonce,
              }, function (err, result) {
                var token = result.transaction.paypal.paymentId;
                col.save({ email: email, password: password, token: token });
                res.status(200).send({token: token});
              });
            } else {
              res.status(200).send({error: "The user already exists"});
            }
        });
    });

    router.post('/registerCheck', function(req, res) {
        res.contentType("application/json");
        var email = req.body.email;
        var password = hash(req.body.password);
        var col = config.db.collection(config.DBCOLLECTIONS.USERS);
        col.findOne({"email":email}, function(err, user) {
            if (err) {
              res.status(500).send({ok: false});
            } else if (!user){
              res.status(200).send({ok: true});
            } else {
              res.status(200).send({ok: false});
            }
        });
    });
    return router;
}
