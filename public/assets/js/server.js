let express = require("express");
let path = require("path");
let fs = require('fs');

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
    res.sendFile(path.join(__dirname, '../../../db/db.json'))
})

notes.post("/api/notes", function (req, res){
    var NewNote = req.body;
    console.log(NewNote);
    fs.appendFile('../../../db/db.json', JSON.stringify(NewNote), function (err){
        if 
        (err) throw (err);
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