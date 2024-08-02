const Comment = require("../models/comment");

module.exports.createComment = (req, res, next) => {
  const { review } = req.params;
  const { text } = req.body;

  Comment.create({ author, product, video, text })
    .then(() => res.status(OK_CODE)
      .send({ data: { author, product, video, text } })
    )
    .catch((err) => {
      if (err.name === 'ValidationError') {
          next(new BadRequestError(err.message));
      } else {
          next(err);
      }
    });
}

module.exports.deleteComment = (req, res, next) => {
  const { id } = req.params;
  
  Comment.findByIdAndDelete(id)
    .then((comment) => {
      res.status(OK_CODE).send({ data: comment });
    })
    .catch((err) => {
      if (err.name === 'NotFound') {
          next(NotFoundError(NOT_FOUND_MESSAGE));
      } else if (err.name === 'CastError') {
          next(new BadRequestError(ID_CAST_MESSAGE))
      } else if (err.name === 'ValidationError') {
          next(new BadRequestError(err.message));
      } else {
          next(err);
      }
  });
}

module.exports.getComments = (req, res, next) => {
  const { reviewId } = req.params;

  Comment.find({ review: reviewId })
    .then(comments => res.status(OK_CODE).send({ data: comments }))
    .catch((err) => {
      if (err.name === 'CastError') {
          next(new BadRequestError(ID_CAST_MESSAGE))
      } else {
          next(err);
      }
    });
}