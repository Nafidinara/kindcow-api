const sql = require("./db.js");
const lv1 = 0.04;
const lv2 = 0.01;
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

User.findById = (address, result) => {
  sql.query('SELECT * FROM users WHERE addr = "'+address+'"', (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found data: ", res[0].id);
      result(null, res[0]);
      return;
    }
    // console.log('ceeeek '+address)
    // not found Harvest with the id
    result({ kind: "not_found" }, null);
  });
};

User.updateById = (id, user, result) => {
  sql.query(
      "UPDATE users SET harvest = harvest+? WHERE id = ?",
      [user.harvest, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }

        if (res.affectedRows == 0) {
          // not found Customer with the id
          result({ kind: "not_found" }, null);
          return;
        }
        console.log('data user : '+JSON.stringify(user));
        // result(null, { id: id, ...user });
        sql.query(
            "UPDATE users SET reward = reward + ? WHERE id = ?",
            [user.harvest*lv1, user.up],
            (err, res) => {
              if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
              }

              if (res.affectedRows == 0) {
                // not found Customer with the id
                result({ kind: "not_found" }, null);
                return;
              }
                console.log('data user up satu : '+JSON.stringify(user));
            }
        );

        sql.query(
            "UPDATE users SET reward = reward + ? WHERE id = ?",
            [user.harvest*lv2, user.up2],
            (err, res) => {
              if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
              }

              if (res.affectedRows == 0) {
                // not found Customer with the id
                result({ kind: "not_found" }, null);
                return;
              }
                console.log('data user up dua : '+JSON.stringify(user));
            }
        );
      }
  );
};

module.exports = User;
