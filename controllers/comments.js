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
