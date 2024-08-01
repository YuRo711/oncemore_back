const Order = require("../models/order");

module.exports.createOrder = (req, res, next) => {
  const date = Date.now();
  const { items } = req.body;

  Order.create({ user, date, items })
    .then(() => res.status(OK_CODE)
      .send({ data: { user, date, items } })
    )
    .catch((err) => {
      if (err.name === 'ValidationError') {
          next(new BadRequestError(err.message));
      } else {
          next(err);
      }
    });
}
