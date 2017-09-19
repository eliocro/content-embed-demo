'use strict';

const fs = require('fs');
const http = require('http');
const express = require('express');
const request = require('request');

const app = express();

// Read partials
const header = fs.readFileSync('./partials/header.html');
const footer = fs.readFileSync('./partials/footer.html');

// Handle routing
app.get('/', (req, res, next) => {
  request({
    method: 'get',
    url: 'http://handverkerportalen.devz.no/'
  },
  (err, response, body) => {
    if(err) {
      return next(err);
    }
    res.send(header + body + footer);
  });
});

// Create HTTP server and start it
let server = http.createServer(app);
server.listen(process.env.PORT || 7777);
server.on('listening', () => {
  console.log('Web Server', 'Started on', server.address().port);
});
