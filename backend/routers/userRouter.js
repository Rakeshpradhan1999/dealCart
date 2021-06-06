import express from 'express';
import {data} from '../data/data.js';
import User from '../models/userModel.js';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import {generateToken, isAdmin, isAuth} from '../utils.js';
const userRouter = express.Router ();
import ApiFeatures from '../apiFeatures.js';
import {
  userSignInValidator,
  userSignupValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
} from '../validators/auth.js';
import {runValidation} from '../validators/index.js';
import {
  forgotPassword,
  resetPassword,
  signIn,
  signUp,
} from '../controller/userController.js';

//seed data
userRouter.get (
  '/seed',
  expressAsyncHandler (async (req, res) => {
    await User.deleteMany ({});
    const createdUser = await User.insertMany (data.users);

    res.send ({createdUser});
  })
);

//register
userRouter.post ('/register', userSignupValidator, runValidation, signUp);

//signIn
userRouter.post ('/signin', userSignInValidator, runValidation, signIn);

//forgot password Validator
userRouter.post (
  '/forgot_password',
  forgotPasswordValidator,
  runValidation,
  forgotPassword
);

//reset password Validator
userRouter.post (
  '/reset_password',
  resetPasswordValidator,
  runValidation,
  resetPassword
);

userRouter.get (
  '/:id',
  isAuth,
  expressAsyncHandler (async (req, res) => {
    const user = await User.findById (req.params.id);
    if (user) {
      res.send (user);
    } else {
      res.status (404);

      throw new Error ('User not found');
    }
  })
);

//get profile and update
userRouter.put (
  '/profile',
  isAuth,
  expressAsyncHandler (async (req, res) => {
    const user = await User.findById (req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.mobile = req.body.mobile || user.mobile;
      user.gender = req.body.gender || user.mobile;
      if (req.body.password) {
        user.password = bcrypt.hashSync (req.body.password, 8);
      }
      const updateUserDetails = await user.save ();
      res.send ({
        _id: updateUserDetails._id,
        name: updateUserDetails.name,
        email: updateUserDetails.email,
        password: updateUserDetails.password,
        gender: updateUserDetails.gender,
        isAdmin: updateUserDetails.isAdmin,
        mobile: updateUserDetails.mobile,
        token: generateToken (updateUserDetails),
      });
    } else {
      res.status (404);
      throw new Error ('User not found');
    }
  })
);
//Get all Users By Admin
userRouter.get (
  '/',
  expressAsyncHandler (async (req, res, next) => {
    const features = new ApiFeatures (User.find (), req.query).pagination ();
    const count = await User.countDocuments ();
    const users = await features.query;
    if (users) {
      res.status (200).send ({
        status: 'success',
        results: users.length,
        data: {users},
        total: count,
      });
    } else {
      res.status (404).send ({message: 'No Orders Found'});
    }
  })
);

userRouter.delete (
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler (async (req, res, next) => {
    const user = await User.findById (req.params.id);
    if (user) {
      await user.remove ();
      res.send ('User Succesfully Deleted');
    } else {
      res.status (404);
      throw new Error ('User not found');
    }
  })
);

userRouter.get (
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler (async (req, res) => {
    const user = await (await User.findById (req.params.id)).select (
      '-password'
    );
    if (user) {
      res.json (user);
    }
  })
);

userRouter.put (
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler (async (req, res, next) => {
    const user = await User.findById (req.params.id);
    if (user) {
      console.log (user);
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.mobile = req.body.mobile || user.mobile;
      user.gender = req.body.gender || user.gender;
      user.isAdmin = req.body.isAdmin;
      const updateUserDetails = await user.save ();
      res.send ({
        _id: updateUserDetails._id,
        name: updateUserDetails.name,
        email: updateUserDetails.email,
        gender: updateUserDetails.gender,
        isAdmin: updateUserDetails.isAdmin,
        mobile: updateUserDetails.mobile,
      });
    } else {
      res.status (404);
      throw new Error ('User not found');
    }
  })
);
export default userRouter;
