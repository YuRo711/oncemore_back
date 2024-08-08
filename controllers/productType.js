const ProductType = require("../models/productType");
const { OK_CODE, NOT_FOUND_MESSAGE, ID_CAST_MESSAGE } = require("../utils/errors");
const BadRequestError = require('../utils/errors/bad-request-err');
const NotFoundError = require('../utils/errors/not-found-err');

module.exports.createProductType = (data, next) => {
  const { name, color, colorImage, productId } = data;
  const data = {
    name, colors: [color], colorImages: [colorImage], products: [productId]
  }

  return ProductType.create(data)
    .then((result) => result)
    .catch((err) => {
      if (err.name === 'ValidationError') {
          console.log(err);
          next(new BadRequestError(err.message));
      } else {
          next(err);
      }
    });
}

module.exports.addProductToType = (data, next) => {
  const { name, color, colorImage, productId } = data;

  return ProductType.findOneAndUpdate({name: name}, {$push: {
    colors: color,
    colorImages: colorImage,
    products: productId,
  }})
    .orFail(() => {
      return this.createProductType(data, next);
    })
    .then((result) => result)
    .catch((err) => {
      if (err.name === 'ValidationError') {
          console.log(err);
          next(new BadRequestError(err.message));
      } else {
          next(err);
      }
    });
}