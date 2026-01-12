const users=require("../model/userModel")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")



//register user
exports.userRegisterController = async (req, res) => {
  console.log("Inside User Register Controller");

  const { username, email, password } = req.body;
  console.log(username, email, password);

  try {
    const existingUser = await users.findOne({ email });

    if (existingUser) {
    
      return res.status(409).json("User Already registered. Please Login");
    }

    const encryptedpassword = await bcrypt.hash(password, 10);

    const newUser = new users({
      username,
      email,
      password: encryptedpassword
    });

    await newUser.save();
    return res.status(200).json(newUser);

  } catch (error) {
    return res.status(500).json(error);
  }
};


///Login user
/// Login user
exports.userLoginController = async (req, res) => {
  console.log("Inside User Login Controller");

  const { email, password } = req.body;
  console.log(email, password);

  try {
    const existingUser = await users.findOne({ email });

    if (existingUser) {

      
      const isMatch = await bcrypt.compare(password, existingUser.password);

      if (isMatch) {

    
        const token = jwt.sign(
          { userMail: existingUser.email },
          process.env.JWT_SECRET_KEY
        );

        res.status(200).json({ existingUser, token });

      } else {
        res.status(401).json("Invalid Credentials");
      }

    } else {
      res.status(404).json("User not Found Please register");
    }

  } catch (error) {
    res.status(500).json(error);
  }
};
