import express from 'express';
import {sendMessage} from '../controller/contactController.js';
const router = express.Router ();
import {contactValidator} from '../validators/auth.js';
import {runValidation} from '../validators/index.js';

router.post ('/', contactValidator, runValidation, sendMessage);

export default router;
