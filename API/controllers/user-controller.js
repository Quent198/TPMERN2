const User = require("../models/user.schema");
const bcrypt = require("bcrypt");

const signupUser = async (req, res) => {
    const { username,  password } = req.body;
    try {
        const userByUsername = await User.findOne({ username }); 
        if (!userByUsername) {
            
            const salt = await bcrypt.genSalt(10);
            const hashPassWord = await bcrypt.hash(password, salt);
            const user = new User({
                username,
                password: hashPassWord,
            });
            await user.save();
            return res.status(200).json({
                message: 'Inscription réussie',
            });
        } else {
            
            return res.status(400).json({
                message: "Nom d'utilisateur déjà existant",
            });
        }
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (user) {
        if (!user.token) {
          const match = await bcrypt.compare(password, user.password);
          if (match) {
            
            res.status(200).json({ user });
          } else {
            res.status(400).json({ message: "Mauvais Email et/ou Password" });
          }
        } else {
          res.status(400).json({ message: "Email non validé" });
        }
      } else {
        res.status(400).json({ message: "Mauvais Email et/ou Password" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

module.exports = { signupUser, loginUser };
