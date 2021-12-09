const AppError = require('../classes/app-error');
const UserError = require('../classes/user-error');

module.exports = (err, req, res, next) => {
  switch (err.type) {
    case AppError.name:
    case UserError.name:
      res.status(err.code).send(err.message);
      break;
    default:
      res.status(500).send('Internal server error');
      break;
  }
};
