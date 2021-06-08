import Contact from '../models/contactModel.js';

export const sendMessage = async (req, res, next) => {
  const {name, email, mobile, subject, message} = req.body;

  const newContact = new Contact ({name, email, mobile, subject, message});

  const data = await newContact.save ();

  if (!data) {
    res.status (400).json ({error: 'Something Went Wrong'});
  }

  res.status (200).json ({message: 'Success'});
};
