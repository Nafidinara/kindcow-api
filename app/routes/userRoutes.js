module.exports = app => {
  const users = require("../controllers/userController.js");

  // Create a new Customer
  app.post("/users",users.validate('create'),users.create);
  app.post("/harvest",users.insertHarvest);
};
