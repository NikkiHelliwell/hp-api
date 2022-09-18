var express = require("express");
var app = express();
var path = require("path");
var fs = require("fs");
var CHARACTERS_JSON = path.join(__dirname, "data/characters.json");
var SPELLS_JSON = path.join(__dirname, "data/spells.json");

app.use("/api", function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/", function (req, res) {
  res.sendfile("public/index.html");
});

app.get("/api/characters", function (req, res) {
  fs.readFile(CHARACTERS_JSON, function (err, data) {
    if (err) process.exit(1);
    res.json(JSON.parse(data));
  });
});

app.get("/api/characters/students", function (req, res) {
  fs.readFile(CHARACTERS_JSON, function (err, data) {
    if (err) process.exit(1);
    json = JSON.parse(data);
    students_array = [];
    for (character of json) {
      if (character.hogwartsStudent == true) {
        students_array.push(character);
      }
    }
    res.json(students_array);
  });
});

app.get("/api/characters/staff", function (req, res) {
  fs.readFile(CHARACTERS_JSON, function (err, data) {
    if (err) process.exit(1);
    json = JSON.parse(data);
    staff_array = [];
    for (character of json) {
      if (character.hogwartsStaff == true) {
        staff_array.push(character);
      }
    }
    res.json(staff_array);
  });
});

app.get("/api/characters/house/:house", function (req, res) {
  fs.readFile(CHARACTERS_JSON, function (err, data) {
    if (err) process.exit(1);
    json = JSON.parse(data);
    house_array = [];
    for (character of json) {
      if (character.house.toLowerCase() == req.params.house.toLowerCase()) {
        house_array.push(character);
      }
    }
    res.json(house_array);
  })
})

app.get("/api/spells", function(req, res){
  fs.readFile(SPELLS_JSON, function(err, data){
    if(err) process.exit(1);
    res.json(JSON.parse(data));
  })
})

app.use(express.static("public"));

app.set("port", (process.env.PORT || 5000));

app.listen(app.get("port"), function() {
  console.log("Node app is running on port", app.get("port"));
});
