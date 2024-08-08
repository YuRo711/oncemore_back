const ProductType = require("../models/productType");
const { OK_CODE, NOT_FOUND_MESSAGE, ID_CAST_MESSAGE } = require("../utils/errors");
const BadRequestError = require('../utils/errors/bad-request-err');
const NotFoundError = require('../utils/errors/not-found-err');

module.exports.createProductType = (req, res, next) => {
  const { name, color, colorImage, productId } = req.body;
  const data = {
    name, colors: [color], colorImages: [colorImage], products: [productId]
  }

  ProductType.create(data)
    .then((result) => res.status(OK_CODE)
      .send({ data: result })
    )
    .catch((err) => {
      if (err.name === 'ValidationError') {
          console.log(err);
          next(new BadRequestError(err.message));
      } else {
          next(err);
      }
    });
}

module.exports.addProductToType = (req, res, next) => {
  const { name, color, colorImage, productId } = req.body;

  ProductType.findOneAndUpdate({name: name}, {$push: {
    colors: color,
    colorImages: colorImage,
    products: productId,
  }})
    .orFail(() => {
      this.createProductType(req, res, next);
      return;
    })
    .then((result) => res.status(OK_CODE)
      .send({ data: result })
    )
    .catch((err) => {
      if (err.name === 'ValidationError') {
          console.log(err);
          next(new BadRequestError(err.message));
      } else {
          next(err);
      }
    });
}