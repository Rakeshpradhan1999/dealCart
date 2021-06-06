import Category from '../models/categoryModel.js';
import slugify from 'slugify';
import ApiFeatures from '../apiFeatures.js';

// Create New Category
export const addCategory = (req, res, next) => {
  const createObj = {
    name: req.body.name,
    slug: req.body.slug ? slugify (req.body.slug) : slugify (req.body.name),
  };

  if (req.body.parentId) {
    createObj.parentId = req.body.parentId;
    createObj.slug = req.body.slug
      ? ` ${req.body.parentName}_${slugify (req.body.slug)}`
      : `${req.body.parentName}_${slugify (req.body.name)}`;
  }
  if (req.body.parentName) {
    createObj.parentName = req.body.parentName;
  }

  const cate = new Category (createObj);
  cate.save ((err, data) => {
    if (err) {
      return res.status (400).json ({
        error: err,
      });
    }
    res.status (200).json ({
      data: data,
    });
  });
};

//helper function
function createCategoryList (categories, parentId = null) {
  let categoryList = [];

  let category;

  if (parentId == null) {
    category = categories.filter (cate => cate.parentId == undefined);
  } else {
    category = categories.filter (cate => cate.parentId == parentId);
  }

  for (let cate of category) {
    categoryList.push ({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      childrens: createCategoryList (categories, cate._id),
    });
  }

  return categoryList;
}
//Get All Categories
export const getAllCategory = (req, res, next) => {
  Category.find ().exec ((error, categories) => {
    if (error) {
      return res.status (400).json ({error});
    }

    if (categories) {
      const categoryList = createCategoryList (categories);
      res.status (200).json ({
        categoryList,
      });
    }
  });
};

export const getParentCategories = async (req, res, next) => {
  const features = new ApiFeatures (Category.find (), req.query)
    .search ()
    .filter ()
    .sorting ()
    .pagination ();
  const categories = await features.query;
  const count = await Category.countDocuments ();
  if (categories) {
    const parentCats = categories.filter (
      cate => cate.parentId == null || undefined
    );

    res.status (200).json ({
      status: 'success',
      results: parentCats.length,
      categories: parentCats,
      total: count,
    });
  } else {
    res.status (404).json ({message: 'Something Went Wrong'});
  }
};

//Delete Category
export const deletCategory = async (req, res, next) => {
  const category = await Category.findById (req.params.id);

  if (category) {
    await category.deleteOne ();
    res.status (200).json ({message: 'success fully deleted'});
  } else {
    res.status (400).json ({message: 'Category Not Found'});
  }
};

//Update Category Controller

export const updateCategory = async (req, res, next) => {
  const category = await Category.findById (req.params.id);
  if (category) {
    category.name = req.body.name || category.name;
    category.slug = req.body.slug || category.slug;
    category.parentId = req.body.parentId || category.parentId;
    category.parentName = req.body.parentName || category.parentName;

    const updatedCategory = await category.save ();
    res.status (200).json ({updatedCategory});
  } else {
    res.status (200).json ({message: 'Category Not Found'});
  }
};

export const childCategory = async (req, res, next) => {
  const features = new ApiFeatures (Category.find (), req.query)
    .search ()
    .filter ()
    .sorting ()
    .pagination ();
  const categories = await features.query;
  const count = await Category.countDocuments ();
  if (categories) {
    const parentCats = categories.filter (
      cate => cate.parentId !== null || undefined
    );

    res.status (200).json ({
      status: 'success',
      results: parentCats.length,
      categories: parentCats,
      total: count,
    });
  } else {
    res.status (404).json ({message: 'Something Went Wrong'});
  }
};
