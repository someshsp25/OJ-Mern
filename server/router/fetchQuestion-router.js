const express = require("express");
const router = express.Router();
const fetchQuestionController = require("../controllers/fetchQuestion-controller");
const authenticateJWT = require("../middlewares/auth-middleware");

router.route("/code/:questionId").get(authenticateJWT, fetchQuestionController.fetchQuestion);

module.exports = router;