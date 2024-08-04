const { BAD_REQUEST_CODE } = require("../utils/errors");
const BadRequestError = require("../utils/errors/bad-request-err");
const bcrypt = require('bcrypt');

module.exports.uploadImage = (req, res, next) => {
  const { image } = req.files;

    if (!!/^image/.test(image.mimetype)) return next(BadRequestError(BAD_REQUEST_CODE));

    bcrypt.hash(image.name, 1)
      .then((hash => {
        const url = __dirname + '/images/' + hash;
        image.mv(url);
        return url;
      })
      .then((url) => res.status(OK_CODE).send({ data: url }))
      .catch((err) => next(err))
    );
}