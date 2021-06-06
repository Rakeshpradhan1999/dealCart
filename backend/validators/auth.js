import {check} from 'express-validator';

export const userSignupValidator = [
  check ('name').not ().isEmpty ().withMessage ('Name is Required'),

  check ('email').isEmail ().withMessage ('Must be a valid Email Address'),

  check ('password')
    .isLength ({min: 6})
    .withMessage ('Password must be at least 6 characters'),
];
export const userSignInValidator = [
  check ('email').isEmail ().withMessage ('Must be a valid Email Address'),

  check ('password')
    .isLength ({min: 6})
    .withMessage ('Password must be at least 6 characters'),
];

export const forgotPasswordValidator = [
  check ('email').isEmail ().withMessage ('Must be a valid Email Address'),
];

export const resetPasswordValidator = [
  check ('newPassword')
    .not ()
    .isEmpty ()
    .isLength ({min: 6})
    .withMessage ('Password must be at least 6 characters'),
];
