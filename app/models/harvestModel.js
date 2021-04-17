const sql = require("./db.js");

// constructor
const Harvest = function(harvest) {
  this.time = harvest.time;
  this.hash = harvest.hash;
  this.amount = harvest.amount,
  this.up = harvest.up,
  this.addr = harvest.addr
};

Harvest.create = (Harvest, result) => {
  sql.query("INSERT INTO harvest SET ?", Harvest, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created harvests: ", { id: res.insertId, ...Harvest });
    result(null, {
      'status' : 'OK',
      'msg' : 'success created',
      'data' : {
        'id' : res.insertId,
        ...Harvest
      }
    });
  });
};

module.exports = Harvest;
