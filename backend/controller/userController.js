import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {generateToken, isAdmin, isAuth} from '../utils.js';
import ApiFeatures from '../apiFeatures.js';
import {sendMailwithNodemailer} from '../helpers/sendmail.js';
import {resetPasswordValidator} from '../validators/auth.js';
import _ from 'lodash';

export const signUp = async (req, res, next) => {
  const {name, email, password} = req.body;

  const dupliUser = await User.findOne ({email: email});
  if (dupliUser) {
    res.status (400).json ({
      error: 'Email already Taken, Please Signin',
    });
  }
  const user = new User ({
    name: name,
    email: email,
    password: bcrypt.hashSync (password, 8),
  });

  const createdUser = await user.save ();
  if (!createdUser) {
    res.status (400).json ({error: 'Something went wrong'});
  }
  res.status (200).json ({
    _id: createdUser._id,
    name: createdUser.name,
    isAdmin: createdUser.isAdmin,
    email: createdUser.email,
    token: generateToken (createdUser),
  });
};

export const signIn = async (req, res) => {
  const user = await User.findOne ({email: req.body.email});
  if (user) {
    if (bcrypt.compareSync (req.body.password, user.password)) {
      res.send ({
        _id: user._id,
        name: user.name,
        isAdmin: user.isAdmin,
        email: user.email,
        token: generateToken (user),
      });
      return;
    }
  }

  res.status (401).json ({error: 'invalid email and password'});
};
//forgot password
export const forgotPassword = async (req, res, next) => {
  const email = req.body.email;

  const user = await User.findOne ({email});
  if (!user) {
    res.status (400).json ({error: 'User does not exist with this email'});
  }

  const token = jwt.sign ({_id: user._id}, process.env.JWT_SECRET, {
    expiresIn: '30m',
  });

  const emailData = {
    from: process.env.EMAIL_FROM, // MAKE SURE THIS EMAIL IS YOUR GMAIL FOR WHICH YOU GENERATED APP PASSWORD
    to: email, // WHO SHOULD BE RECEIVING THIS EMAIL? IT SHOULD BE THE USER EMAIL (VALID EMAIL ADDRESS) WHO IS TRYING TO SIGNUP
    subject: 'Password Reset Link',
    html: `
                <h1>Please use the following link to Set your password</h1>
                <p>${process.env.CLIENT}/user/reset_password/${token}</p>
                <hr />
                <p>This email may contain sensitive information</p>
                <p>${process.env.CLIENT}</p>
                <p>Don't reply to this email</p>
                

            `,
  };

  return user.updateOne ({resetPasswordLink: token}, (err, success) => {
    if (err) {
      return res.status (400).json ({
        error: 'Database Connection  error on user password forgot request',
      });
    } else {
      sendMailwithNodemailer (req, res, emailData);
    }
  });
};
//reset Password
export const resetPassword = async (req, res, next) => {
  const {resetPasswordLink, newPassword} = req.body;
  console.log (req.body.newPassword);

  if (resetPasswordLink) {
    jwt.verify (resetPasswordLink, process.env.JWT_SECRET, function (
      err,
      decode
    ) {
      if (err) {
        return res.status (400).json ({error: 'Expired Link. Try Again!'});
      }

      User.findOne ({resetPasswordLink}, (err, user) => {
        if (err || !user) {
          return res.status (400).json ({
            error: 'Something went Wrong. try later',
          });
        }

        const updateFields = {
          password: bcrypt.hashSync (newPassword, 8),
          resetPasswordLink: '',
        };
        user = _.extend (user, updateFields);
        user.save ((err, result) => {
          if (err) {
            return res.status (400), json ({
              error: 'Error reset Password , Try again Later!',
            });
          }
          res.json ({
            message: 'Great! Now you can login with your new password',
          });
        });
      });
    });
  }
};
