// jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {

  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data);


  var options = {
    url: "https://us20.api.mailchimp.com/3.0/lists/ae8a6a4a52",
    method: "POST",
    headers: {
      "Authorization": "sanyaodare d8ad7f696032d71476c4eb8a432316fd-us20"
    },
    body: jsonData
  };

  request(options, function(error, response, body) {
    if (error) {
      res.sendFile(__dirname + "/failure.html");
    } else {
      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
    }
  });


});


app.post("/failure", function(req, res) {
  res.redirect("/");
});



app.listen (3000, function() {
  console.log("Server is running on port 3000....");  
});

/*
All the lines of codes look O.K. However, 
the API KEY and email list I.D seem no to be in sync.
*/


// API KEY
// d8ad7f696032d71476c4eb8a432316fd-us20

// New Email List Id
// ae8a6a4a52

// GUESSED URL
// https://us20.api.mailchimp.com/3.0/lists/ae8a6a4a52
