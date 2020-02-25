let express = require("express");
let path = require("path");

let notes = express();
var PORT = process.env.PORT || 2323;

notes.use(express.urlencoded({ extended: true }));
notes.use(express.json());
// notes.use('/static', express.static(path.join(__dirname, 'public')));

notes.get ("/public/assets/css/styles.css", function (req, res) {
    res.sendFile(path.join(__dirname, '../../../public/assets/css/styles.css'));
});

notes.get ("/public/assets/js/index.js", function (req, res) {
    res.sendFile(path.join(__dirname, '../../../public/assets/js/index.js'));
});


notes.get ("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../../index.html"));
});

notes.get("/notes", function (req, res){
    res.sendFile(path.join(__dirname, "../../notes.html"));
});

notes.listen(PORT, function () {
    console.log ("NoteTaker is listening on Port " + PORT);
})