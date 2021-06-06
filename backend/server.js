import express from 'express';
const app = express ();
import path from 'path';
import mongoose from 'mongoose';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
import cors from 'cors';
import uploadRouter from './routers/uploadRouter.js';
import dotenv from 'dotenv';
import orderRouter from './routers/orderRouter.js';
import categoryRouter from './routers/categoryRouter.js';
import {notFound, errorHandler} from './middlewares/errorMiddleware.js';
import morgan from 'morgan';

dotenv.config ();
mongoose.connect (`${process.env.MONGO_URI}`, {
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

app.use (express.json ());
app.use (express.urlencoded ({extended: true}));
if (process.env.NODE_ENV !== 'production') {
  app.use (morgan ('dev'));
}

app.use ('/api/users', userRouter);
app.use ('/api/products', productRouter);
app.use ('/api/category', categoryRouter);
app.use ('/api/orders', orderRouter);
app.use ('/api/upload', uploadRouter);
app.get ('/api/config/paypal', (req, res) => {
  res.send (process.env.PAYPAL_CLIENT);
});

if (process.env.NODE_ENV === 'development') {
  app.use (cors ({origin: `http://localhost:3000`}));
}
const __dirname = path.resolve ();
app.use ('/uploads', express.static (path.join (__dirname, '/uploads')));
if (process.env.NODE_ENV === 'production') {
  app.use (express.static (path.join (__dirname, 'frontend/build')));

  app.get ('*', (req, res) =>
    res.sendFile (path.resolve (__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get ('/', (req, res) => {
    res.send ('Api is running');
  });
}

app.use (notFound);
app.use (errorHandler);

const port = process.env.PORT || 5000;

app.listen (port, () => {
  console.log (
    `server is running in ${process.env.NODE_ENV} mode on http://localhost:${port}`
  );
});
