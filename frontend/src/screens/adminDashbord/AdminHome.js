import React, { useEffect } from 'react';
import SideBar from '../../components/AdminSIdebar/SideBar';
import { Route, Switch } from 'react-router-dom';
import Products from './Products/Products';
import { useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Users from './Users/Users';
import Orders from './Orders/Orders';
import Dashboard from './Dashboard/DashBoardScreen';
import useStyles from './styles';
import EditProductScreen from './Products/EditProductScreen';
import EdiitUserScreen from './Users/EdiitUserScreen';
import { Footer, Meta } from '../../components/index';
import Categories from './categories/categories';
import SubCategories from './subCategories/SubCategories';
const AdminHome = ({ history }) => {
	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;
	const classes = useStyles();
	useEffect(
		() => {
			if (!userInfo.isAdmin) {
				history.push('/');
			}
		},
		[ history, userInfo ]
	);

	const { path, url } = useRouteMatch();
	return (
		<div style={{ marginLeft: 230 }} className={classes.bg}>
			{/* <Sidebar url={url} /> */}
			<SideBar url={url} />
			<Meta title='Admin' />

			<Switch>
				<Route path={`${path}/`} exact component={Dashboard} />
				<Route path={`${path}/dashboard`} component={Dashboard} />
				<Route path={`${path}/products`} exact component={Products} />
				<Route path={`${path}/categories`} exact component={Categories} />
				<Route path={`${path}/subcategories`} exact component={SubCategories} />
				<Route path={`${path}/orders`} component={Orders} />
				<Route path={`${path}/users`} exact component={Users} />
				<Route path={`${path}/products/:id/edit`} component={EditProductScreen} exact />
				<Route path={`${path}/user/:id/edit`} component={EdiitUserScreen} exact />
			</Switch>
			<Footer />
		</div>
	);
};

export default AdminHome;
