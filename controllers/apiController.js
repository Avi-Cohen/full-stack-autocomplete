const fs = require("fs");
module.exports = (app) => {
  app.get("/api/contacts", (req, res) => {
    try {
      const contacts = JSON.parse(fs.readFileSync("./contacts0.json")).filter(
        (item) => item.email?.toLowerCase().includes(req.query.srsearch)
      );
      res.send(contacts);
    } catch (e) {
      console.error(e.message);
      res.send(e.message);
    }
  });
};
