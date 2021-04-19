const express = require("express");
const bodyParser = require("body-parser");
const customerRoutes = require("./app/routes/customer.routes.js");
const userRoutes = require("./app/routes/userRoutes.js");
const harvestData = require("./app/helpers/harvest.js");
const users = require("./app/controllers/userController.js");

const app = express();

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to kindcow API" });
});

customerRoutes(app);
userRoutes(app);

setInterval(() => {
  console.log('get');
  harvestData.getTransaction();
}, 60000);

setInterval(() => {
  console.log('insert');
  users.insertHarvest();
},61000);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
