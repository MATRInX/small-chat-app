const path = require('path');
const express = require('express');
// const axios = require('axios');
require('dotenv').config({path: '.env.dev'});

const app = new express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
  console.log('server is workingo on port no: ', port);
  console.log('act time: ', new Date());
});