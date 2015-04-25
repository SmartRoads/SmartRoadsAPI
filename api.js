var express = require("express");

var router = express.Router();

router.post('/status/:country/:road/:kilometer', function(req, res) {
    res.contentType("application/json");
    var country = req.params.country.toUpperCase(),
    road = req.params.road.toString(),
    kilometer = parseFloat(req.params.kilometer);
 
    // todo: check authentication
    console.log(req.params.token);
    
    // Data validation
    if (isNaN(kilometer) || (country.length > 2)) {
        res.status(400).send("{\"error\":\"invalid format\"}");
    } else {
        var col = db.collection(DBCOLLECTION);
        // todo: manage timestamps
        col.findOne({"country":country, "road":road, "kilometer":kilometer}, function(err, doc) {
            if (err) {
                res.status(500).send("{\"error\":\"database connection fail\"}");
            } else {
                res.status(200).send(JSON.stringify(doc));
            }
        });
    }
});

router.put('/update/:country/:road/:kilometer', function(req, res) {
    res.contentType("application/json");
    // todo: create content
});

module.exports = router;
