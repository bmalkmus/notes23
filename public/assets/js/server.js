let express = require("express");
let path = require("path");

let notes = express();
var PORT = process.env.PORT || 2323;


notes.get ("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../../index.html"));
});

notes.get("/notes", function (req, res){
    res.sendFile(path.join(__dirname, "../../notes.html"));
});

notes.listen(PORT, function () {
    console.log ("NoteTaker is listening on Port " + PORT);
})