const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller");
const signupSchema = require("../validators/auth-validator");
const validate = require("../middlewares/validate-middleware");
const authenticateJWT = require("../middlewares/auth-middleware");




// router.get("/",(req,res) =>{
//     res.status(200).send('Hello,World !! this is router');
// });

router.route("/").get(authController.home);

router.route("/register").post( validate(signupSchema), authController.register);

router.route("/login").post(authController.login);

router.route("/user").get(authenticateJWT, authController.user);

module.exports = router;