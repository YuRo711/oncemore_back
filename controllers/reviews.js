const Review = require("../models/review");

module.exports.getReviews = (req, res, next) => {
  Review.find()
    .then(reviews => res.status(OK_CODE).send({ data: reviews }))
    .catch((err) => next(err));
}


module.exports.getUserReviews = (req, res, next) => {
  const { id } = req.params;

  Review.find({ author: id })
    .then(reviews => res.status(OK_CODE).send({ data: reviews }))
    .catch((err) => next(err));
}


module.exports.getProductReviews = (req, res, next) => {
  const { id } = req.params;

  Review.find({ product: id })
    .then(reviews => res.status(OK_CODE).send({ data: reviews }))
    .catch((err) => next(err));
}


module.exports.getReview = (req, res, next) => {
  const { id } = req.params;

  Review.findById(id)
    .orFail(() => {
      const error = new Error();
      error.name = "NotFound";
      return Promise.reject(error);
    })
    .then(review => res.status(OK_CODE).send({ data: review }))
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
