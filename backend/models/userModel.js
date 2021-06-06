import mongoose from 'mongoose';
import crypto from 'crypto';
const userSchema = new mongoose.Schema (
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
    gender: {
      type: String,
      default: 'Male',
    },
    mobile: {
      type: Number,
    },
    resetPasswordLink: {
      data: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// //virtual
// userSchema
//   .virtual ('password')
//   .set (function (password) {
//     this._password = password;
//     this.salt = this.makeSalt ();
//     this.hashed_password = this.encryptPassword (password);
//   })
//   .get (function () {
//     return this._password;
//   });

// //Methods
// userSchema.methods = {
//   authenticate: function (plainPassword) {
//     return this.encryptPassword (plainPassword) === this.hashed_password;
//   },

//   encryptPassword: function (password) {
//     if (!password) return '';
//     try {
//       return crypto
//         .createHmac ('sha1', this.salt)
//         .update (password)
//         .digest ('hex');
//     } catch (err) {
//       return '';
//     }
//   },

//   makeSalt: function () {
//     return Math.round (new Date ().valueOf () * Math.random) + '';
//   },
// };

const User = mongoose.model ('User', userSchema);
export default User;
