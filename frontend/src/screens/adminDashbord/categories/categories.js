import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Loading } from '../../../components';

import { createCategory, getCategories,deleteCategory, updateCategory } from '../../../redux/actions/categoryAction';
import { FaUserEdit } from 'react-icons/fa';
import { IoMdTrash } from 'react-icons/io';

import TableWrapper from '../TableWrapper';
import { TableHead, TableBody, TableRow, TableCell, IconButton } from '@material-ui/core';
import useStyles from '../styles';
import CategoryModal from "./CategoryModal"
import { CATEGORY_CREATE_RESET } from '../../../redux/types/CategoryTypes';

const Categories = ({ history }) => {
	const [ page, setPage ] = useState(0);
	const [limit, setLimit] = useState(10);
	const [open, setOpen] = useState(false)
	const [name, setName] = useState('')
  	const [slug, setSlug] = useState('')
	const [updateOpen, setUpdateOpen] = useState(false)
	const [updateName, setUpdateName] = useState('')
  	const [updateSlug, setUpdateSlug] = useState('')
  	const [updateid, setUpdateid] = useState('')
	const classes = useStyles();
	const dispatch = useDispatch();


	const categoryList = useSelector((state) => {
		return state.categoryList;
	});
	const { loading: categoryLoading, categories, error: categoryError, success: categorySuccess, total, count } = categoryList;
	
	
	const { success: addSuccess, category: addCategory, loading: addLoading } = useSelector((state) => state.createCate)
	
	const { success, loading: deletLoading, error: deleteError } = useSelector((state) => state.deleteCate);
	const { success:updateSuccess, loading: updateLoading, error: updateError } = useSelector((state) => state.updateCate);


	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;

	useEffect(
		() => {
			dispatch(getCategories("", limit, page));
			dispatch({ type: CATEGORY_CREATE_RESET });
			if (!userInfo.isAdmin) {
				history.push('/signin');
			}
			if (addSuccess || success || updateSuccess) {
				dispatch(getCategories("", limit, page));
			} 
		},
		[dispatch, userInfo, history, page, limit, addSuccess, success, updateSuccess]
	);

const createCate = () => {
	setOpen(true)
}

		//Delete a cate
	const deleteHandler = (id) => {
		dispatch(deleteCategory(id));
	};

//Create a Cate
	const createHandler = (e) => {
    e.preventDefault()
    dispatch(createCategory({name:name,slug:slug}))
    setOpen(false)
	}
	
//updateHandler
	const updateHandle = (cate) => {
		setUpdateOpen(true)
		setUpdateid(cate._id)
		setUpdateName(cate.name)
		setUpdateSlug(cate.slug)
	}
	const updateHandler = (e) => {
		e.preventDefault()
		dispatch(updateCategory({_id:updateid , name: updateName, slug: updateSlug }))
		setUpdateOpen(false)
		
	}	

	const rowData = [ 'Sr No.', 'Id', 'Name', 'Slug', 'Action' ];

	return categoryLoading || addLoading  || deletLoading || updateLoading ? (
		<Loading />
	) : (
			<>
				<CategoryModal open={open}
					name={name}
					setName={setName}
					slug={slug}
					setSlug={setSlug}
					setOpen={setOpen}
					addSuccess={addSuccess}
					addCategory={addCategory}
					addLoading={addLoading}
					submitHandler={createHandler}
				/>
				<CategoryModal open={updateOpen}
					name={updateName}
					setName={setUpdateName}
					slug={updateSlug}
					setSlug={setUpdateSlug}
					setOpen={setUpdateOpen}
					addSuccess={addSuccess}
					addCategory={addCategory}
					addLoading={addLoading}
					submitHandler={updateHandler}
				/>
		<TableWrapper
			title='Categories'
			add
			count={count}
			page={page}
			setPage={setPage}
			limit={limit}
			setLimit={setLimit}
			total={total}
			addData='Add Category'
					noDispatch
					addFunction={createCate}
		>
			<TableHead>
				<TableRow>{rowData.map((data, index) => <TableCell key={index}>{data}</TableCell>)}</TableRow>
			</TableHead>
			<TableBody>
				{categories && categories.length > 0 ? (
					categories.map((cate, index) => (
						<TableRow key={index}>
							<TableCell>{index + 1}</TableCell>
							<TableCell>{cate._id}</TableCell>
							<TableCell>{cate.name}</TableCell>
							<TableCell>{cate.slug}</TableCell>

							<TableCell>
								{
									<div>
										<IconButton className={classes.info} onClick={()=> updateHandle(cate)} >
											<FaUserEdit />
										</IconButton>
										<IconButton className={classes.error} onClick={() => deleteHandler(cate._id)}>
											<IoMdTrash />
										</IconButton>
									</div>
								}
							</TableCell>
						</TableRow>
					))
				) : (
					<TableRow>
						<TableCell>Empty</TableCell>
					</TableRow>
				)}
			</TableBody>
				</TableWrapper>
				</>
	);
};

export default Categories;
