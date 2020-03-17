// TODO: Add some testing of POSTed data


// require('dotenv').config()
const express = require('express');
const jsonParser = express.json();
const cors = require('cors');
const fs = require('fs');

const app = express()

app.use(express.json());
app.use(cors())

app.get('/hello', (req, res) => {
  res.status(200);
  res.send('Hello, everything was ok!');
});

app.post('/save', (req, res) => {
  const dataToSave = req.body;
  saveDataToFile(dataToSave);

  res.send({'message': 'POST request saved to JSON file.'});
  res.status(200);
});

// Utility fonction
function saveDataToFile(dataToSave) {   
  // stringify JSON Object
  const jsonContent = JSON.stringify(dataToSave, null, 2);
  const filename = "saved-data/highlights-" + Math.round(Date.now() / 1000).toString();
  fs.writeFile(filename, jsonContent, 'utf8', function (err) {
      if (err) {
          console.log("An error occured while writing JSON Object to File.");
          return console.log(err);
      }
      console.log("JSON file has been saved.");
  });
}


module.exports = app