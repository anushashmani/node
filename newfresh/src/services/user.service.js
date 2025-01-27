const db = require("../models/index.js");
const { user: User, token: Token } = db;

const createUser = async (payload) => {
  try {
    const newUser = new User({ ...payload });
    const user = await newUser.save();

    return user;
  } catch (error) {
    throw error;
  }
};

const saveToken = async (payload) => {
  try {
    // console.log("payload", payload);
    const newToken = new Token({ ...payload });
    // console.log("newtoken", newToken);
    const token = await newToken.save();
    // console.log("token", token);
    return token;
  } catch (error) {
    throw error;
  }
};

const getTokenByUID = async (uid) => {
  try {
    // console.log("uid", uid);
    const response = await Token.find({ user: uid });
    // console.log("response", response);
    return response;
  } catch (error) {
    throw error;
  }
};

const UpdateUserByEmail = async (email) => {
  try {
    const response = await User.updateOne({ email: email }, { isActive: true });
    return response;
  } catch (error) {
    throw error;
  }
};

const findByEmail = async (email) => {
  try {
    const user = await User.findOne({ email: email });
    return user;
  } catch (error) {
    throw error;
  }
};

const deleteTokensByUID = async (uid) => {
  try {
    const response = await Token.deleteMany({ user: uid });
    return response;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
  findByEmail,
  getTokenByUID,
  saveToken,
  deleteTokensByUID,
  UpdateUserByEmail,
};
