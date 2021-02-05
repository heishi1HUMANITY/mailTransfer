const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post('/mailserver/', (req, res => {
  console.log(req.body);
}))