const Order = require("../models/order");

module.exports.createOrder = (req, res, next) => {
  const date = Date.now();
  const { items } = req.body;

  Order.create({ user, date, items, quantity })
    .then(() => res.status(OK_CODE)
      .send({ data: { user, date, items, quantity } })
    )
    .catch((err) => {
      if (err.name === 'ValidationError') {
          next(new BadRequestError(err.message));
      } else {
          next(err);
      }
    });
}

module.exports.updateOrderStatus = (req, res, next) => {
  const status = req.body.status;
  const changes = { status };
  const { id } = req.props;

  Order.findByIdAndUpdate(id, changes)
    .then(() => res.status(OK_CODE)
      .send({ data: { status } })
    )
    .catch((err) => {
      if (err.name === 'ValidationError') {
          next(new BadRequestError(err.message));
      } else {
          next(err);
      }
    });
}
