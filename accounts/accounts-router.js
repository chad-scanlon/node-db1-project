const express = require("express");

const db = require("../data/dbConfig.js");
const { count } = require("../data/dbConfig.js");

const router = express.Router();

router.get("/", (req, res) => {
  db.select("*")
    .from("accounts")
    .then((accountsArray) => res.status(200).json({ data: accountsArray }))
    .catch((err) => console.log(err));
});
// limited accounts
router.get("/limited", (req, res) => {
  db.select("*")
    .from("accounts")
    .then((accountsArray) => res.status(200).json({ data: accountsArray }))
    .catch((err) => console.log(err));
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db("accounts")
    .where("id", id)
    .then((account) => res.status(200).json({ data: account }))
    .catch((err) => console.log(err));
});

router.post("/", (req, res) => {
  const accountData = req.body;
  db("accounts")
    .insert(accountData)
    .then((id) =>
      res.status(201).json({ data: id[0], message: "successful add" })
    )
    .catch((err) => console.log(err));
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  db("accounts")
    .where("id", id)
    .update(changes)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ data: count, message: "successful edit" });
      } else {
        res.status(404).json({ message: "the account could not be found" });
      }
    })
    .catch((err) => console.log(err));
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db("accounts")
    .where("id", id)
    .del()
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ data: count, message: "successful delete" });
      } else {
        res.status(404).json({ message: "the account could not be deleted" });
      }
    })
    .catch((err) => console.log(err));
});

module.exports = router;
