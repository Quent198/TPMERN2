const {
  signupUser,
  loginUser,
} = require("../controllers/user-controller");

const router = require("express").Router();

router.post("/signup", signupUser);
router.post("/signin", loginUser);





module.exports = router;
