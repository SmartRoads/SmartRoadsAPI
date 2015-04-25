var express = require('express');
var mongodb = require('mongodb');
var bodyParser = require('body-parser');
var argv = require('minimist')(process.argv.slice(2));

// config app to use bodyParser to get data from POST
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Config parameters
var config = {
    DBNAME : "smartroads",
    DBCOLLECTION : "data",
    DBHOST : argv.h || null,
    DBPORT : argv.P || null,
    DBUSER : argv.u || null,
    DBPWD : argv.p || null,
    ROOT_PATH : argv.path || ""
}

if (!(config.DBHOST || config.DBPORT)) {
    console.log("[!] Usage: node " + __filename + " -h <DBHOST> -P <DBPORT> [-u <USER> -p <PWD>] [-path <PATH>]");
    process.exit(1);
}

// Main
config.db = new mongodb.Db(config.DBNAME, new mongodb.Server(config.DBHOST, config.DBPORT, {auto_reconnect: true}), {new: -1});

config.db.open(function(err, client) {
        if (err) {
            // todo: add logger to log error
            config.db.close();
            process.exit(1);
        } else {
            config.con = client;
            if (config.DBUSER && config.DBPWD) {
                config.db.authenticate(config.DBUSER, config.DBPWD, function(err, res) {
                    if (err) {
                        config.db.close();
                        process.exit(1);
                    }
                });
            }
        }
});

// Import API public methods
var api = require('./api.js')(config);
var auth = require('./auth.js')(config);

// Register routes
app.use(config.ROOT_PATH + "/api", api);
app.use(config.ROOT_PATH + "/auth", auth);

app.use(config.ROOT_PATH + "/", express.static(__dirname + "/app"));

app.get("*", function(req, res) {
  res.redirect("/");
});

// Start listening on port
app.listen(8888);
