const express = require("express");
const router = express.Router();
const saveQuestion = require("../controllers/saveQuestion-controller");

router.route("/savequestion").post(saveQuestion);

module.exports = router;