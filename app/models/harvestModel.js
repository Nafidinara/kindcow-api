const sql = require("./db.js");

// constructor
const Harvest = function (harvest) {
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

    // console.log("created harvests: ", { id: res.insertId, ...Harvest });
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

Harvest.findById = (harvestTime, result) => {
  sql.query(`SELECT * FROM harvest WHERE time = ${harvestTime} LIMIT 1`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found data: ", res[0].time+' hash : '+res[0].hash);
      result(null, res[0]);
      return;
    }

    // not found Harvest with the id
    result({ kind: "not_found" }, null);
  });
};

module.exports = Harvest;
