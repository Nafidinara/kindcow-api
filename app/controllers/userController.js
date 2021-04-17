const User = require("../models/userModel.js");
const Harvest = require("../models/harvestModel.js");
const Harvestdata = require("../helpers/harvest.js");
const { body, validationResult } = require('express-validator');

exports.validate = (method) => {
  switch (method) {
    case 'create': {
     return [ 
        body('addr', 'address doesnt exists').exists(),
        body('up', 'Invalid email').default('0'),
       body('harvest', 'Invalid email').default(0.00000000),
       body('reward', 'Invalid email').default(0.00000000)
       ]   
    } case 'insertHarvest': {
      return [
        body('up', 'Invalid email').default('0'),
      ]
    }
  }
}

// Create and Save a new Customer
exports.create = (req, res) => {

  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Customer
  const user = new User({
    addr: req.body.addr,
    up: req.body.up,
    harvest: req.body.harvest,
    reward: req.body.reward
  });

  // Save Customer in the database
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    else res.send(data);
  });
};

// Create and Save a new Customer
exports.insertHarvest = (req, res) => {

  // res.send(Harvestdata.baseArray);return;

  let data = Harvestdata.baseArray;
  // Create a Customer
  data.forEach((data,index) => {
    if(!data.up) data.up = '0';
    const harvest = new Harvest({
      time: data.time,
      hash: data.hash,
      amount: data.amount * 0.00000001,
      addr: data.from,
      up: data.up,
    });

    // Save Customer in the database
    Harvest.create(harvest, (err, data) => {
      if (err)
        console.log(err.message || "Some error occurred while creating the Harvest.");
      // else res.send(data);
      else console.log(data);
    });

  });
};
