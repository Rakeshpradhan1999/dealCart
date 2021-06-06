import express from 'express';
import { addCategory, childCategory, deletCategory, getAllCategory, getParentCategories, updateCategory } from '../controller/categoryController.js';
import expressAsyncHandler from 'express-async-handler';
const router = express.Router();

//create new Category route
router.post('/create', expressAsyncHandler(addCategory));

//Get all Category route
router.get('/all', getAllCategory);

//Get Parent Categories route
router.get('/parent', expressAsyncHandler(getParentCategories));

//Get Child Categories route
router.get('/child', expressAsyncHandler(childCategory));

//Category Delete route
router.delete('/:id', expressAsyncHandler(deletCategory));

//Category Update Route
router.put('/:id', expressAsyncHandler(updateCategory));

export default router;
