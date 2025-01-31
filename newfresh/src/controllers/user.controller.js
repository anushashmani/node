const jwt = require("jsonwebtoken");

const { config } = require("../config/server.config.js");
const {
  createUser,
  findByEmail,
  getTokenByUID,
  saveToken,
  deleteTokensByUID,
  UpdateUserByEmail,
} = require("../services/user.service.js");
const { status500, status200 } = require("../status/res.status.js");
const { compareHash, createHash } = require("../utils/hash.utils.js");
const { sendEmail } = require("../services/mail.service.js");
// const { generateOtp } = require("../utils/randomString.util.js");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findByEmail(email, password);
    if (!user)
      return res
        .status(500)
        .json({ success: false, message: "invalid creds", data: null });

    if (!user.isActive)
      return res.status(500).json({
        success: false,
        message: "please verify your account first",
        data: null,
      });

    const isAlreadyLoggedin = await getTokenByUID(user.id);
    if (isAlreadyLoggedin?.length > 0)
      return res
        .status(500)
        .json({ success: false, message: "already logged in", data: null });

    const passwordMatch = await compareHash(password, user.password);
    if (!passwordMatch) {
      return res
        .status(500)
        .json({ success: false, message: "Password don't Match", data: null });
    }

    const token = jwt.sign(
      { email: user.email, username: user.username },
      config.secretKey,
      { expiresIn: "1h" }
    );
    console.log("token", token);
    const generateToken = await saveToken({ token, user: user.id });

    return res.status(200).json({
      success: true,
      message: "success",
      data: { token: generateToken.token },
    });
  } catch (error) {
    res.send("Something went wrong");
  }
};

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // const user = await findByEmail(email);
    // if (user) {
    //   return res.send("Email already exists");
    // }

    const hashedPassword = await createHash(password);
    const payload = {
      username,
      email,
      password: hashedPassword,
    };
    const newUser = await createUser(payload);
    if (!newUser) {
      return res.send(status500);
    }

    return res.send(status200);
  } catch (error) {
    console.log(error);
    res.send(status500);
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await findByEmail(email);
    if (!user) return res.send("unprocessible request");

    if (user.otp !== otp) return res.send("invalid otp");

    const response = await UpdateUserByEmail(user.email);
    return res.send("otp verified");
  } catch (error) {
    return res.send("Something went wrong");
  }
};

const logout = async (req, res) => {
  try {
    const { uid } = req.body;
    const logoutUser = await deleteTokensByUID(uid);
    if (logoutUser.deletedCount === 0) {
      return res
        .status(500)
        .json({ success: false, message: "already logged out", data: null });
    }

    return res
      .status(200)
      .json({ success: true, message: "succesfully logged out", data: null });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "something went wrong", data: null });
  }
};

module.exports = {
  signup,
  login,
  logout,
  verifyOtp,
};
