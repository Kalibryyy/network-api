const router = require('express').Router();
const usersRouter = require('./users.js');
const NotFoundError = require('../errors/not-found-err');
const errorMessages = require('../configs/error-messages');

router.use('/users', usersRouter);

router.all('*', (req, res, next) => {
  next(new NotFoundError(errorMessages.notFoundError.general));
});

module.exports = router;
