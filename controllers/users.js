const bcrypt = require('bcrypt');
const User = require('../models/user');
const {
  OK_CODE,
  NOT_FOUND_MESSAGE,
  ID_CAST_MESSAGE,
  CONFLICT_MESSAGE,
} = require('../utils/errors')
const BadRequestError = require('../utils/errors/bad-request-err');
const NotFoundError = require('../utils/errors/not-found-err');
const ConflictError = require('../utils/errors/conflict-err');


module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 5)
    .then((hash) => User.create({ name, email, password: hash }))
    .then(() => res.status(OK_CODE).send({ data: { name, email } }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
          next(new BadRequestError(err.message));
      } else if (err.code === 11000) {
          next(new ConflictError(CONFLICT_MESSAGE));
      } else {
          next(err);
      }
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  const { _id } = req.user;

  User.findById(_id)
    .orFail(() => {
      const error = new Error();
      error.name = "NotFound";
      return Promise.reject(error);
    })
    .then(user => res.status(OK_CODE).send({ data: user }))
    .catch((err) => {
      if (err.name === 'NotFound') {
          next(NotFoundError(NOT_FOUND_MESSAGE));
      } else if (err.name === 'CastError') {
          next(BadRequestError(ID_CAST_MESSAGE))
      } else {
          next(err);
      }
    });
}

module.exports.getUser = (req, res, next) => {
  const { id } = req.params;

  User.findById(id)
    .orFail(() => {
      const error = new Error();
      error.name = "NotFound";
      return Promise.reject(error);
    })
    .then(user => res.status(OK_CODE).send({ data: user }))
    .catch((err) => {
      if (err.name === 'NotFound') {
          next(NotFoundError(NOT_FOUND_MESSAGE));
      } else if (err.name === 'CastError') {
          next(BadRequestError(ID_CAST_MESSAGE))
      } else {
          next(err);
      }
    });
}

module.exports.editCurrentUser = (req, res, next) => {
  const { _id } = req.user;
  changes.name ??= req.body.name;
  changes.avatar ??= req.body.avatar;
  
  User.findByIdAndUpdate(_id, changes, { new: true, runValidators: true })
      .then((user) => {
          const { name, avatar, email } = user;
          res.status(OK_CODE).send({ data: { name, avatar, email} });
      })
      .catch((err) => {
          if (err.name === 'NotFound') {
              next(NotFoundError(NOT_FOUND_MESSAGE));
          } else if (err.name === 'CastError') {
              next(BadRequestError(ID_CAST_MESSAGE))
          } else if (err.name === 'ValidationError') {
              next(new BadRequestError(err.message));
          } else {
              next(err);
          }
  });
}

module.exports.blockUser = (req, res, next) => {
  const { id } = req.params;

  User.findByIdAndUpdate(_id, { blocked: true, })
      .then((user) => {
          const { name, email } = user;
          res.status(OK_CODE).send({ data: { name, email} });
      })
      .catch((err) => {
          if (err.name === 'NotFound') {
              next(NotFoundError(NOT_FOUND_MESSAGE));
          } else if (err.name === 'CastError') {
              next(BadRequestError(ID_CAST_MESSAGE))
          } else if (err.name === 'ValidationError') {
              next(new BadRequestError(err.message));
          } else {
              next(err);
          }
  });
}