let express = require("express");
let path = require("path");
let fs = require('fs');
let json = "../../../db/db.json"

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

notes.get ("/api/notes", function (req, res){
    res.sendFile(path.join(__dirname, json))
})

notes.post("/api/notes", function (req, res){
    let data = fs.readFileSync(json, 'utf8');
    data = JSON.parse(data);
    console.log(data);
    var NewNote = req.body;
    data.push(NewNote);
    data = JSON.stringify(data);
    fs.writeFile(json, data, function (err){
        if (err) throw (err);
        console.log ('Note Saved!');
        res.send("finished");
    })
})

notes.get("/notes", function (req, res){
    res.sendFile(path.join(__dirname, "../../notes.html"));
});

notes.listen(PORT, function () {
    console.log ("NoteTaker is listening on Port " + PORT);
})