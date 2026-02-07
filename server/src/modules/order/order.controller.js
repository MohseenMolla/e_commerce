const Order = require("./order.model");

exports.createOrder = async (req, res) => {
  try {
    const { name, address, phone, items, totalAmount } = req.body;

    if (!name || !address || !phone || !items?.length) {
      return res.status(400).json({ message: "All fields required" });
    }

    const order = await Order.create({
      customer: { name, address, phone },
      items,
      totalAmount
    });

    res.status(201).json({
      success: true,
      order
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  const orders = await Order.find()
    .populate("items.product", "title price")
    .sort("-createdAt");

  res.json(orders);
};

exports.updateOrderStatus = async (req, res) => {
  const { status } = req.body;

  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { orderStatus: status },
    { new: true }
  );

  res.json(order);
};
