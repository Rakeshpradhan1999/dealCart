import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Loading} from '../../../components';

import {
  createCategory,
  getCategories,
  deleteCategory,
  updateCategory,
  getSubCategories,
} from '../../../redux/actions/categoryAction';
import {FaUserEdit} from 'react-icons/fa';
import {IoMdTrash} from 'react-icons/io';

import TableWrapper from '../TableWrapper';
import {
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
} from '@material-ui/core';
import useStyles from '../styles';
import SubCategoryModal from './SubCategoryModal';
import {CATEGORY_CREATE_RESET} from '../../../redux/types/CategoryTypes';

const SubCategories = ({history}) => {
  const [page, setPage] = useState (0);
  const [limit, setLimit] = useState (10);
  const [open, setOpen] = useState (false);
  const [name, setName] = useState ('');
  const [slug, setSlug] = useState ('');
  const [parent, setParent] = useState ({});
  const [updateParent, setUpdateParent] = useState ({});
  const [updateOpen, setUpdateOpen] = useState (false);
  const [updateName, setUpdateName] = useState ('');
  const [updateSlug, setUpdateSlug] = useState ('');
  const [updateid, setUpdateid] = useState ('');
  const classes = useStyles ();
  const dispatch = useDispatch ();

  const subCategoryList = useSelector (state => state.subCategoryList);
  const {
    loading: categoryLoading,
    categories,
    error: categoryError,
    success: categorySuccess,
    total,
    count,
  } = subCategoryList;

  const categoryList = useSelector (state => state.categoryList);
  const {
    loading: parentcategoryLoading,
    categories: parentCategory,
    error: parentCategoryError,
    success: parentCategorySuccess,
    total: parentCateTotal,
    count: parentCateCount,
  } = categoryList;

  const {
    success: addSuccess,
    category: addCategory,
    loading: addLoading,
  } = useSelector (state => state.createCate);

  const {success, loading: deletLoading, error: deleteError} = useSelector (
    state => state.deleteCate
  );
  const {
    success: updateSuccess,
    loading: updateLoading,
    error: updateError,
  } = useSelector (state => state.updateCate);

  const userSignin = useSelector (state => state.userSignin);
  const {userInfo} = userSignin;

  useEffect (
    () => {
      dispatch (getSubCategories ('', limit, page));
      dispatch (getCategories ('', limit, page));

      dispatch ({type: CATEGORY_CREATE_RESET});
      if (!userInfo.isAdmin) {
        history.push ('/signin');
      }
      if (addSuccess || success || updateSuccess) {
        dispatch (getSubCategories ('', limit, page));
      }
    },
    [
      dispatch,
      userInfo,
      history,
      page,
      limit,
      addSuccess,
      success,
      updateSuccess,
    ]
  );

  const createCate = () => {
    setOpen (true);
  };
  //Parent Handler
  const parentHandler = e => {
    setParent (e.target.value);
    console.log (parent);
  };
  //UpdateParent Handler
  const updateParentHandler = e => {
    setUpdateParent (e.target.value);
    console.log (parent);
  };

  //Delete a cate
  const deleteHandler = id => {
    dispatch (deleteCategory (id));
  };

  //Create a Cate
  const createHandler = e => {
    e.preventDefault ();
    dispatch (
      createCategory ({
        name: name,
        slug: slug,
        parentId: parent._id,
        parentName: parent.name,
      })
    );
    setName ('');
    setSlug ('');
    setParent ({});
    setOpen (false);
  };

  //updateHandler
  const updateHandle = cate => {
    setUpdateOpen (true);
    setUpdateid (cate._id);
    setUpdateName (cate.name);
    setUpdateSlug (cate.slug);
  };

  const updateHandler = e => {
    e.preventDefault ();
    dispatch (
      updateCategory ({
        _id: updateid,
        name: updateName,
        slug: updateSlug,
        parentId: updateParent._id,
        parentName: updateParent.name,
      })
    );
    setUpdateOpen (false);
  };

  const rowData = ['Sr No.', 'Id', 'Name', 'Parent', 'Slug', 'Action'];

  return categoryLoading ||
    addLoading ||
    deletLoading ||
    updateLoading ||
    parentcategoryLoading
    ? <Loading />
    : <React.Fragment>
        <SubCategoryModal
          open={open}
          name={name}
          setName={setName}
          slug={slug}
          setSlug={setSlug}
          setOpen={setOpen}
          addSuccess={addSuccess}
          addCategory={addCategory}
          addLoading={addLoading}
          submitHandler={createHandler}
          parentCate={parentCategory}
          parent={parent}
          setParent={setParent}
          handleChange={parentHandler}
        />
        <SubCategoryModal
          open={updateOpen}
          name={updateName}
          setName={setUpdateName}
          slug={updateSlug}
          setSlug={setUpdateSlug}
          setOpen={setUpdateOpen}
          submitHandler={updateHandler}
          parentCate={parentCategory}
          parent={updateParent}
          setParent={setUpdateParent}
          handleChange={updateParentHandler}
        />

        <TableWrapper
          title="SubCategories"
          add
          count={total}
          page={page}
          setPage={setPage}
          limit={limit}
          setLimit={setLimit}
          total={total}
          addData="Add SubCategory"
          noDispatch
          addFunction={createCate}
        >
          <TableHead>
            <TableRow>
              {rowData.map ((data, index) => (
                <TableCell key={index}>{data}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {categories && categories.length > 0
              ? categories.map ((cate, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{cate._id}</TableCell>
                    <TableCell>{cate.name}</TableCell>
                    <TableCell>{cate.parentName}</TableCell>
                    <TableCell>{cate.slug}</TableCell>

                    <TableCell>
                      {
                        <div>
                          <IconButton
                            className={classes.info}
                            onClick={() => updateHandle (cate)}
                          >
                            <FaUserEdit />
                          </IconButton>
                          <IconButton
                            className={classes.error}
                            onClick={() => deleteHandler (cate._id)}
                          >
                            <IoMdTrash />
                          </IconButton>
                        </div>
                      }
                    </TableCell>
                  </TableRow>
                ))
              : <TableRow>
                  <TableCell>Empty</TableCell>
                </TableRow>}
          </TableBody>
        </TableWrapper>
      </React.Fragment>;
};

export default SubCategories;
