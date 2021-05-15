import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./style";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Card as MuiCard,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { IoBagOutline } from "react-icons/io5";
import { cartAction } from "../../redux/actions/cartAction";
import { useDispatch } from "react-redux";
const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.primary.main,
  },
  tooltip: {
    backgroundColor: theme.palette.primary.main,
  },
}));

function StyledTooltip(props) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
}

const Card = ({ product }) => {
  const classes = styles();
  const [image, setImage] = useState(product.images[0]);

  const dispatch = useDispatch();

  const addTocartHandler = () => {
    dispatch(cartAction(product._id));
  };

  const truncateText = (text, limit) => {
    if (product.name.length > limit) {
      return text.substring(0, limit) + "...";
    } else {
      return text;
    }
  };
  const cardText = truncateText(product.name, 25);
  return (
    <MuiCard
      onMouseEnter={() => setImage(product.images[2])}
      onMouseLeave={() => setImage(product.images[0])}
      className={classes.root}
      elevation={0}
    >
      <CardMedia className={classes.media} image={image} />
      <CardContent
        component={Link}
        to={`/products/${product._id}`}
        className={classes.content}
      >
        <Box className={classes.titleWrapper}>
          <Typography variant="body1" className={classes.title}>
            {product.title}
          </Typography>
          <Rating value={product.rating} size={"small"} readOnly />
        </Box>
        <Typography
          variant="caption"
          style={{ textTransform: "capitalize", marginTop: 10 }}
        >
          {cardText}{" "}
        </Typography>
        <Typography variant="body2" color="primary" style={{ marginTop: 5 }}>
          ${product.price}.00{" "}
        </Typography>
      </CardContent>
      <Box className={classes.actions}>
        <div>
          <StyledTooltip title="Add to Cart" placement="left">
            <IconButton color="primary" onClick={addTocartHandler}>
              <IoBagOutline />
            </IconButton>
          </StyledTooltip>
        </div>
        {/* <StyledTooltip title="Quick View" placement="left">
          <IconButton color="primary" onClick={viewProductHandler}>
            <AiOutlineEye />
          </IconButton>
        </StyledTooltip> */}
      </Box>
    </MuiCard>
  );
};

export default Card;
