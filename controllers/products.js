const Product = require("../models/product");

module.exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => res.status(OK_CODE).send({ data: products }))
    .catch((err) => next(err));
}


module.exports.getProduct = (req, res, next) => {
  const { id } = req.params;

  Product.findById(id)
    .orFail(() => {
      const error = new Error();
      error.name = "NotFound";
      return Promise.reject(error);
    })
    .then(product => res.status(OK_CODE).send({ data: product }))
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


module.exports.createProduct = (req, res, next) => {
  const { name, photo, category, brand, color, price, description,
    composition, appliance, country, article, size, barcode, stock
  } = req.body;
  const productData = { 
    name, photo, category, brand, color, price, description,
    composition, appliance, country, article, size, barcode, stock
  };

  Product.create(productData)
    .then(() => res.status(OK_CODE)
      .send({ data: productData })
    )
    .catch((err) => {
      if (err.name === 'ValidationError') {
          next(new BadRequestError(err.message));
      } else {
          next(err);
      }
    });
}


module.exports.deleteProduct = (req, res, next) => {
  const { id } = req.params;
  
  Review.findByIdAndDelete(id)
    .then((product) => {
      res.status(OK_CODE).send({ data: product });
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


module.exports.editProduct = (req, res, next) => {
  const { id } = req.props;
  const changes = req.body;
  
  User.findByIdAndUpdate(id, changes)
      .then((product) => {
          res.status(OK_CODE).send({ data: product });
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