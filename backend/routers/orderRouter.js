import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import { isAdmin, isAuth } from "../utils.js";
const orderRouter = express.Router();
import ApiFeatures from "../apiFeatures.js";
//get orders by user
orderRouter.get(
  "/mine",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  })
);

orderRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: "Cart is Empty" });
      console.log("cart empty");
    } else {
      const order = new Order({
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
      });

      const createdOrder = await order.save();
      res
        .status(201)
        .send({ message: "New Order created", order: createdOrder });
    }
  })
);

//Get All orders by admin
orderRouter.get(
  "/",

  expressAsyncHandler(async (req, res) => {
    const features = new ApiFeatures(Order.find(), req.query).pagination();
    const count = await Order.countDocuments();
    const orders = await features.query;
    if (orders) {
      res.status(200).send({
        status: "success",
        data: { orders },
        results: orders.length,
        total: count,
      });
    } else {
      res.status(404).send({ message: "No orders Found" });
    }
  })
);

orderRouter.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
      res.send({ order: order });
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);

orderRouter.put(
  "/:id/pay",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
      const updateOrder = await order.save();
      res.send({ message: "Order Paid", order: updateOrder });
    } else {
      res.status(404).send({ message: "Order not Found" });
    }
  })
);

//set order Delivered by admin
orderRouter.put(
  "/:id/delivered",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isDelivered = true;
      order.deliverdAt = Date.now();

      const updateOrder = await order.save();
      res.send({ message: "Order Delivered", order: updateOrder });
    } else {
      res.status(404).send({ message: "Order not Found" });
    }
  })
);

export default orderRouter;
