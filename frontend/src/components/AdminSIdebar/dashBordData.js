import { BiHomeAlt, BiBox } from 'react-icons/bi';
import { FiUsers } from 'react-icons/fi';
import { CgList,CgListTree } from 'react-icons/cg';
import { IoGridOutline } from 'react-icons/io5';

export const dashbordData = [
	{
		title: 'Dashboard',
		icon: <BiHomeAlt />,
		link: 'dashboard'
	},
	{
		title: 'Users',
		icon: <FiUsers />,
		link: 'users'
	},
	{
		title: 'Products',
		icon: <BiBox />,
		link: 'products'
	},
	{
		title: 'Categories',
		icon: <IoGridOutline />,
		link: 'categories'
	},
	{
		title: 'SubCategories',
		icon: <CgListTree />,
		link: 'subcategories'
	},

	{
		title: 'Orders',
		icon: <CgList />,
		link: 'orders'
	}
];
