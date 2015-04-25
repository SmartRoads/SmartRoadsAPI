var express = require('express');
var mongodb = require('mongodb');
var bodyParser = require('body-parser');
var argv = require('minimist')(process.argv.slice(2));

// config app to use bodyParser to get data from POST
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Global vars
var DBNAME = "smartroads", DBCOLLECTION = "data", DBHOST, DBPORT, ROOT_PATH;

// Init arguments
var DBHOST = argv.h || null;
var DBPORT = argv.P || null;
var DBUSER = argv.u || null;
var DBPWD = argv.p || null;
var ROOT_PATH = argv.path || "";

if (!(DBHOST || DBPORT)) {
    console.log("[!] Usage: node " + __filename + " -h <DBHOST> -P <DBPORT> [-u <USER> -p <PWD>] [-path <PATH>]");
    process.exit(1);
}

// Main
var db = new mongodb.Db(DBNAME, new mongodb.Server(DBHOST, DBPORT, {auto_reconnect: true}), {new: -1}), con;

db.open(function(err, client) {
        if (err) {
            // todo: add logger to log error
            db.close();
            process.exit(1);
        } else {
            con = client;
            if (DBUSER && DBPWD) {
                db.authenticate(DBUSER, DBPWD, function(err, res) {
                    if (err) {
                        db.close();
                        process.exit(1);
                    }
                });
            }
        }
});

// Import API public methods
var router = require('./api.js');

// Register routes
app.use(ROOT_PATH + "/api", router);

app.use(ROOT_PATH + "/", express.static(__dirname + "/app"));

app.get("*", function(req, res) {
  res.redirect("/");
});

// Start listening on port
app.listen(8888);
