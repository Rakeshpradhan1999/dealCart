import React from 'react';

const Error = (error) => {
	console.log(error);
	return <div>{error.error}</div>;
};

export default Error;
