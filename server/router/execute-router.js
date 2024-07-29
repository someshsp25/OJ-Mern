const express = require("express");
const router = express.Router();
const executeController = require("../controllers/execute-controller");

router.route("/execute").post(executeController.executeCode);

module.exports = router;