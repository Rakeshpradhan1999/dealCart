import express from "express";
import expressAsyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
const productRouter = express.Router();
import { data } from "../data/data.js";
import { isAdmin, isAuth } from "../utils.js";
import ApiFeatures from "../apiFeatures.js";

productRouter.get(
  "/",
  expressAsyncHandler(async (req, res, next) => {
    const features = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter()
      .sorting()
      .pagination();
    const products = await features.query;
    const count = await Product.countDocuments();
    if (products) {
      res.status(200).json({
        status: "success",
        results: products.length,
        data: { products },
        total: count,
      });
    } else {
      res.status(404).json({ message: "Something went Wrong" });
    }
  })
);
//Find Product Top rating
productRouter.get(
  "/top",
  expressAsyncHandler(async (req, res, next) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(10);

    if (products) {
      res.json(products);
    }
  })
);
//Find Products For Men
productRouter.get(
  "/men",
  expressAsyncHandler(async (req, res, next) => {
    const products = await Product.find({ category: "Men" }).sort().limit(20);

    if (products) {
      res.json(products);
    }
  })
);

//Find Products For Women
productRouter.get(
  "/women",
  expressAsyncHandler(async (req, res, next) => {
    const products = await Product.find({ category: "Women" })
      .sort({ createdAt: 1 })
      .limit(20);

    if (products) {
      res.json(products);
    }
  })
);

//Find Products For Kids
productRouter.get(
  "/kids",
  expressAsyncHandler(async (req, res, next) => {
    const products = await Product.find({ category: "Kids" }).sort().limit(20);

    if (products) {
      res.json(products);
    }
  })
);

//filter router for find products with dates
productRouter.get(
  "/filterd",
  expressAsyncHandler(async (req, res, next) => {
    const fdate = req.query.from;
    const ldate = req.query.to;

    const products = await Product.find({
      createdAt: { $gte: new Date(fdate), $lte: new Date(ldate) },
    });

    products.length
      ? res.status(200).json(products)
      : res.status(200).json({ message: "no products found in this period" });
  })
);

//seed product
productRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res, next) => {
    await Product.deleteMany({});
    const createProducts = await Product.insertMany(data.products);
    res.status(200).json({ createProducts });
  })
);

productRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.status(200).send(product);
    } else {
      res.status(404);
      throw new Error("Product not Found");
    }
  })
);

productRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne();
      res.status(200).json({ message: "Product is removed" });
    } else {
      res.status(404);
      throw new Error("Product not Found");
    }
  })
);

//Create Product
productRouter.post(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res, next) => {
    const product = new Product({
      name: "product name ",
      price: 0,
      user: req.user._id,
      images: [],
      title: "Sapmle Pro",
      brand: "Sample",
      category: "Men",
      subCategory: "Shirt",
      description: "Hello this is sample products",
      rating: 0,
      stock: 40,
    });

    const createdProduct = await product.save();

    res.status(201).send(createdProduct);
  })
);

//find product by id and update

productRouter.put(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res, next) => {
    const {
      name,
      title,
      brand,
      images,
      category,
      subCategory,
      description,
      price,
      rating,
      stock,
    } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = name;
      product.title = title;
      product.brand = brand;
      product.images = images || product.images;
      product.category = category;
      product.subCategory = subCategory;
      product.description = description;
      product.price = price;
      product.rating = rating || product.rating;
      product.stock = stock;

      const updatedProduct = await product.save();
      res.json({ updatedProduct });
    } else {
      res.status(404);
      throw new Error("Product not Found");
    }
  })
);

//find product by id and create a New review

productRouter.post(
  "/:id/reviews",
  isAuth,
  expressAsyncHandler(async (req, res, next) => {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      const allreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (allreadyReviewed) {
        res.status(404);
        throw new Error("Product Allready Reviewed");
      }

      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      const updatedProduct = await product.save();
      res.json({ updatedProduct });
    } else {
      res.status(404);
      throw new Error("Product not Found");
    }
  })
);

export default productRouter;
