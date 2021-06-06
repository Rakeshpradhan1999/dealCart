import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Welcome to DealCart || Shopping World",
  keywords: "Men Fashions, Women Fashions, Kids Fashions , cheap price clothes",
  description: "We sell Clothes In cheap price",
};
export default Meta;
