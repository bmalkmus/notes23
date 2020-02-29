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

notes.get ("/api/notes", function (req, res){
    res.sendFile(path.join(__dirname, json))
})

notes.post("/api/notes", function (req, res){
    let data = fs.readFileSync(json, 'utf8');
    data = JSON.parse(data);
    console.log(data);
    var NewNote = req.body;
    NewNote.id = NewNote.title;
    console.log(NewNote);
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

notes.get('/api/notes/:id', function(req,res){
    var typedID = req.params.id;
    let data = fs.readFileSync(json, 'utf8');
    data = JSON.parse(data);
    for (let i = 0; i < data.length; i++){
        if (typedID === data[i].id){
            return res.json(data[i]);
        }
    }

})

notes.delete('/api/notes/:id', function (req, res){
    var clickedID = req.params.id;
    let data = fs.readFileSync(json, 'utf8');
    data = JSON.parse(data);
    for (let i = 0; i < data.length; i++){
        if (clickedID === data[i].id){
            data.splice(i, 1);
            data = JSON.stringify(data);
            fs.writeFile(json, data, function (err){
                if (err) throw (err);
            
            })   
        }
    }
    res.send('Note Deleted');
})

notes.get('*',function (req, res) {
    res.sendFile(path.join(__dirname, "../../index.html"));;
});

notes.listen(PORT, function () {
    console.log ("NoteTaker is listening on Port " + PORT);
})
