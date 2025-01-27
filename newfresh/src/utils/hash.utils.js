const bcrypt = require("bcrypt");

const createHash = async (plainText) => {
  const hash = await bcrypt.hash(plainText, 10);
  // console.log("plaintext", hash);
  return hash;
};

const compareHash = async (plainText, hashedText) => {
  const isCompared = await bcrypt.compare(plainText, hashedText);
  // console.log("iscompared", isCompared);
  return isCompared;
};

module.exports = {
  createHash,
  compareHash,
};
