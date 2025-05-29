const bcrypt = require('bcrypt');

const hashPassword = async (plainPassword) => {
  return await bcrypt.hash(plainPassword, 12);
};

module.exports = { hashPassword };
