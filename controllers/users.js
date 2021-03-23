const User = require('../models/user');
const { errorHandler } = require('../middlewares/error-handler');
const ConflictingReqError = require('../errors/conflicting-req-err');
const NotFoundError = require('../errors/not-found-err');
const errorMessages = require('../configs/error-messages');

const createUser = (req, res, next) => {
  const { name, email, password, image } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        next(new ConflictingReqError(errorMessages.conflictingReqError.user));
      }
    });

  User.create({
    name, email, password, image
  })
    .then((user) => {
      res.send({
        name: user.name,
        email: user.email,
        image: user.image,
        id: user._id,
      });
    })
    .catch((err) => errorHandler(res, err, next));
};

const getUsers = (req, res, next) => {
  User.find({ })
    .then((users) => {
      if (!users.length) {
        res.status(200).send([]);
      }
      res.send(users);
    })
    .catch((err) => errorHandler(res, err, next));
};

const deleteUser = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(() => {
      next(new NotFoundError(errorMessages.notFoundError.user));
    })
    .then((user) => {
      User.deleteOne(user)
        .then(() => {
          res.send(user);
        })
        .catch((err) => errorHandler(res, err, next));
    })
    .catch((err) => errorHandler(res, err, next));
};

module.exports = {
  createUser,
  getUsers,
};
