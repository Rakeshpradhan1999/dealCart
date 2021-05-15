import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { createUseStyles } from 'react-jss';

const styles = createUseStyles({
	rating: {
		display: 'flex',
		marginBottom: 10,
		alignItems: 'center',
		'& span': {
			color: '#FDCC0D',
			marginRight: 5
		}
	}
});

const Rating = ({ rating, numOfReivews, style }) => {
	const classes = styles();

	return (
		<div className={`${classes.rating} `} style={style}>
			<span>{rating >= 1 ? <FaStar /> : rating >= 0.5 ? <FaStarHalfAlt /> : <FaRegStar />}</span>
			<span>{rating >= 2 ? <FaStar /> : rating >= 1.5 ? <FaStarHalfAlt /> : <FaRegStar />}</span>
			<span>{rating >= 3 ? <FaStar /> : rating >= 2.5 ? <FaStarHalfAlt /> : <FaRegStar />}</span>
			<span>{rating >= 4 ? <FaStar /> : rating >= 3.5 ? <FaStarHalfAlt /> : <FaRegStar />}</span>
			<span>{rating >= 5 ? <FaStar /> : rating >= 4.5 ? <FaStarHalfAlt /> : <FaRegStar />}</span>
			<span className='text-dark'>{numOfReivews && `${numOfReivews} Reviews`} </span>
		</div>
	);
};

export default Rating;
