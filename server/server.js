const express = require("express");
const path = require("path");
const http = require("http");
const fs = require('fs');

// Path to the pct-data.sjon files used for fs read file
const listPath = __dirname + '/../pct-data.json';
const testPath = __dirname + '/../test.json';

const app = express();
const server = http.createServer(app);

// Set up server middleware to render static index.html file
app.use(express.static(path.join(__dirname, '/../client')));

// Set port to environment variable or default local port 8000
const port = process.env.PORT || 8000;

// Connect to server on specific port
server.listen(port, () => console.log("Listening on port", port));

// Created endpoint for get requst to grab data from pct-data.json
// Had to do server side to use the fs module
app.get('/pct-data.json', (req, res) => {
  const data = fs.readFileSync(testPath, 'utf-8');
  res.json(data);
});

// Export incase want to add extra functionality, end points for make more modular
module.exports = app;
