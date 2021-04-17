const sql = require("./db.js");

// constructor
const User = function(user) {
  this.date = user.date;
  this.addr = user.addr;
  this.up = user.up,
  this.up2 = user.up2,
  this.harvest = user.harvest,
  this.reward = user.reward,
  this.date = user.date
};

User.create = (User, result) => {
  sql.query("INSERT INTO users SET ?", User, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created users: ", { id: res.insertId, ...User });
    result(null, {
      'status' : 'OK',
      'msg' : 'success created',
      'data' : {
        'id' : res.insertId,
        ...User
      }
    });
  });
};

module.exports = User;
