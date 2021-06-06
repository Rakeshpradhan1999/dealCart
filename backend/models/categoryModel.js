import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema (
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
    },
    parentId: {
      type: String,
      default: null,
    },
    parentName: {
      type: String,
      default: null,
    },
  },
  {timestamps: true}
);

const Category = mongoose.model ('Category', CategorySchema);

export default Category;
