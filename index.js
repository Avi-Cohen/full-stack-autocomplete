const express = require("express");
const apiController = require("./controllers/apiController");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 5001;

app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1>contacts-rest-api</h1>");
});

apiController(app);

app.listen(PORT,()=>console.log('running'));
