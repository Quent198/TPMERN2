const {
  signupUser,
} = require("../controllers/user-controller");

const router = require("express").Router();

router.post("/signup", signupUser);





module.exports = router;
