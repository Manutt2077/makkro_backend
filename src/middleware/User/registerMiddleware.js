const { validateRegister } = require('../../validators/User/registerValidator');

const validateRegisterMiddleware = (req, res, next) => {
  const error = validateRegister(req.body);
  if (error) {
    return res.status(400).json({ error });
  }

  next(); 
};

module.exports = validateRegisterMiddleware;
