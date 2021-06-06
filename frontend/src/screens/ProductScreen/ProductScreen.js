import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Header, Loading } from "../../components";
import { BiShoppingBag } from "react-icons/bi";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import {
  productCreateReview,
  productDetailAction,
} from "../../redux/actions/productAction";
import { Link } from "react-router-dom";
import { Rating, Alert, AlertTitle } from "@material-ui/lab";
import { PRODUCT_CREATE_REVIEW_RESET } from "../../redux/types/productType";
import {
  Container,
  Grid,
  Button,
  TextField,
  Typography,
  Box,
  Breadcrumbs,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import ProductSlider from "./ProductSlider";
import useStyles from "./styles";
import { Footer, Meta } from "../../components/index";
const ProductScreen = ({ match, history }) => {
  const classes = useStyles();
  const productId = match.params.id;
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;

  const createReview = useSelector((state) => state.createReview);
  const {
    success: reviewSuccess,
    loading: reviewLoading,
    error: reviewError,
  } = createReview;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  useEffect(() => {
    if (reviewSuccess) {
      setComment("");
      setRating("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(productDetailAction(productId));
  }, [dispatch, productId, reviewSuccess]);

  const addToCart = () => {
    history.push(`/cart/${productId}`);
  };

  const submitReview = (e) => {
    e.preventDefault();
    dispatch(productCreateReview(productId, { rating, comment }));
  };

  const addData = [
    " 100% Original Products",
    " Free Delivery on order above Rs.499",
    "Easy 30 days returns and exchanges",
    "Try & Buy might be available",
    " Order before 6 PM to get express delivery",
  ];
  return (
    <>
      <Header history={history} />
      <Meta title={product.name} />
      <Box mt={14} />

      <Container xs={12}>
        <Box className={classes.root}>
          {loading || reviewLoading ? (
            <Loading />
          ) : error ? (
            <Box>Something went wrong</Box>
          ) : (
            <Grid container style={{ width: "100%" }} spacing={5}>
              {/* Images Thumbnai */}
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <ProductSlider images={product.images} />
              </Grid>
              {/* Contents */}
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <Box className={classes.productContent}>
                  <Breadcrumbs>
                    <Link to="/">Home</Link>
                    <Link to="/products">Shop</Link>
                    <Link to={`/products/${product._id}`}>
                      {product.category}
                    </Link>
                  </Breadcrumbs>
                  <Box mb={3}>
                    <Typography className={classes.title} variant="h6">
                      {product.title}
                    </Typography>
                    <Typography variant="subtitle2">
                      <Rating
                        value={product.rating}
                        readOnly
                        size="small"
                        style={{ fontSize: 16 }}
                      />
                      {product.numOfReviews !== 0 &&
                        `(${product.numOfReviews} customer reviews)`}
                    </Typography>
                  </Box>
                  <Box mb={2}>
                    <Typography
                      variant="h6"
                      className={classes.title}
                      color="primary"
                    >
                      ${product.price}.00
                    </Typography>
                    <Typography variant="caption">
                      Inclusive All Taxes
                    </Typography>
                    <Box mt={2}>
                      <Typography variant="subtitle2">
                        Stock Status :{" "}
                        {product.stock !== 0 ? "In Stock" : "Out of Stock"}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography>{product.description}</Typography>
                  <Box width={"100%"} mt={2} mb={2}>
                    <Button
                      variant="contained"
                      startIcon={<BiShoppingBag />}
                      color="primary"
                      size="large"
                      fullWidth
                      disabled={product.stock === 0 ? true : false}
                      onClick={addToCart}
                    >
                      Add to Bag
                    </Button>
                  </Box>
                  <Divider />
                  <Box component={"ul"}>
                    {addData.map((item, index) => (
                      <Typography
                        component={"li"}
                        key={index}
                        variant="subtitle2"
                        style={{ margin: "5px 0", lineHeight: "1" }}
                      >
                        {item}
                      </Typography>
                    ))}
                  </Box>
                  {/*Accordion  */}
                  <Accordion elevation={0}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography variant="subtitle2" className={classes.title}>
                        Description
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="subtitle2">
                        Pellentesque habitant morbi tristique senectus et netus
                        et malesuada fames ac turpis egestas. Vestibulum tortor
                        quam, feugiat vitae, ultricies eget, tempor sit amet,
                        ante. Donec eu libero sit amet quam egestas semper.
                        Aenean ultricies mi vitae est. Mauris placerat eleifend
                        leo.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion elevation={0}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <Typography variant="subtitle2" className={classes.title}>
                        Addtional Information
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box>
                        <Typography component={"p"} variant="subtitle2">
                          Category :{product.category}
                        </Typography>
                        <br />
                        <Typography component="p" variant="subtitle2">
                          SubCategory :{product.subCategory}
                        </Typography>
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion elevation={0}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel3a-content"
                      id="panel3a-header"
                    >
                      <Typography variant="subtitle2" className={classes.title}>
                        Customer Reviews
                        {product.reviews.length !== 0 &&
                          `(${product.reviews.length})`}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box>
                        {product.numOfReviews !== 0 ? (
                          <Typography variant="subtitle2">
                            {product.numOfReviews} Reviews
                          </Typography>
                        ) : (
                          <Typography variant="subtitle2">
                            No Reviews Be The first to Review this product
                          </Typography>
                        )}

                        <List>
                          {product.reviews.map((review) => (
                            <ListItem
                              key={review._id}
                              style={{ display: "inline-block" }}
                            >
                              <ListItemText primary={review.name} />
                              <Typography variant="subtitle2">
                                {review.createdAt.substring(0, 10)}
                              </Typography>
                              <Rating
                                value={review.rating}
                                readOnly
                                size="small"
                                style={{ fontSize: "14px" }}
                              />
                              <br />
                              <Typography variant="subtitle">
                                {review.comment}
                              </Typography>
                            </ListItem>
                          ))}
                          <ListItem style={{ display: "inline-block" }}>
                            <Box my={3}>
                              <Typography
                                variant="body2"
                                className={classes.title}
                              >
                                Add a Review
                              </Typography>
                            </Box>
                            {reviewError && (
                              <Alert severity="error">{reviewError}</Alert>
                            )}
                            {userInfo ? (
                              <form onSubmit={submitReview}>
                                <Box mb={3} mt={2}>
                                  <Typography
                                    variant="subtitle2"
                                    component={"h6"}
                                  >
                                    Your Rating *
                                  </Typography>
                                  <Rating
                                    name="simple-controlled"
                                    value={rating}
                                    onChange={(event, newValue) => {
                                      setRating(newValue);
                                    }}
                                    style={{ fontSize: 16 }}
                                  />
                                </Box>
                                <TextField
                                  label=" Your Review "
                                  required
                                  rows="4"
                                  placeholder="Your Review"
                                  fullWidth
                                  name="comment"
                                  multiline
                                  variant="outlined"
                                  onChange={(e) => {
                                    setComment(e.target.value);
                                  }}
                                />

                                <Box mt={3}>
                                  <Button
                                    color="primary"
                                    type="submit"
                                    variant="contained"
                                  >
                                    Submit
                                  </Button>
                                </Box>
                              </form>
                            ) : (
                              <Alert
                                severity="info"
                                component={Link}
                                to="/signin"
                                variant="filled"
                              >
                                Please Login to Review
                              </Alert>
                            )}
                          </ListItem>
                        </List>
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                </Box>
              </Grid>
            </Grid>
          )}
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default ProductScreen;

// {product.reviews.find(
//   (r) => r.user.toString() === userInfo._id
// )
//   ? "Update Your Review "
//   : ""}

//extras

// <div className="container-fluid">
//             <div className="row">
//               <div className="col-12 col-sm-12 col-md-6 col-lg-6">
//                 <ProductSlide product={product} />
//               </div>
//               <div className="col-12 col-sm-12 col-md-6 col-lg-6">
//                 <div className="">
//                   <h4 className="my-2 mt-md-0">{product.title}</h4>
//                   <h6 className="text-muted my-2">{product.name}</h6>
//                   <MaterialRating
//                     value={product.rating}
//                     readonly
//                     size="small"
//                   />
//                   <hr />
//                   <p className="fw-bold fs-4 mb-1">
//                     <span>Rs. {product.price}</span>
//                   </p>
//                   <span style={{ color: "#03a685" }} className="fs-6 fw-normal">
//                     inclusive all Taxes
//                   </span>

//                   <br />
//                   <div className="mt-2">
//                     Stock Status :{" "}
//                     {product.stock > 0 ? (
//                       <span className="text-success fw-bold">In-Stock </span>
//                     ) : (
//                       <span className="text-warning">Out-Of-Stock </span>
//                     )}
//                   </div>
//                   <div>
//                     <button
//                       onClick={addToCart}
//                       className={`btn btn-primary shadow border-radius py-2 px-4 mr-2 mt-3 ${
//                         product.stock <= 0 && "disabled"
//                       }`}
//                     >
//                       <span className="d-flex align-items-center justify-content-center">
//                         <BiShoppingBag />
//                         <span className="mx-1">Add to Bag</span>
//                       </span>
//                     </button>
//                   </div>
//                   <hr className="hr" />
//                   <ul className="">
//                     <li>100% Original Products</li>
//                     <li>Free Delivery on order above Rs.499</li>
//                     <li>Easy 30 days returns and exchanges</li>
//                     <li>Try & Buy might be available</li>
//                     <li>Order before 6 PM to get express delivery</li>
//                   </ul>

//                   <h6 className="text-uppercase mt-4 fw-bold">
//                     Product Details
//                   </h6>
//                   <p>{product.description}</p>
//                   <hr className="hr mb-2" />
//                 </div>
//                 <div className="my-4">
//                   <h6 className="text-uppercase my-3 fw-bold">
//                     Customer Reviews
//                     {product.reviews.length && `(${product.reviews.length})`}
//                   </h6>
//                   {product.reviews.length === 0 && (
//                     <div className="alert alert-info">No Reviews</div>
//                   )}
//                   <ul className="list-group list-group-flush">
//                     {product.reviews.map((review) => (
//                       <li className="list-group-item px-0" key={review._id}>
//                         <strong>{review.name}</strong>
//                         <MaterialRating value={review.rating} readonly />
//                         <p>{review.createdAt.substring(0, 10)}</p>
//                         <p>{review.comment}</p>
//                       </li>
//                     ))}
//                     <li className="list-group-item px-0">
//                       <h6 className="text-uppercase my-4 fw-bold">
//                         Write a Review
//                       </h6>
//                       {reviewError && (
//                         <div className="alert alert-danger">{reviewError}</div>
//                       )}
//                       {userInfo ? (
//                         <form onSubmit={submitReview}>
//                           <p className="form-label mb-0">Rating</p>
//                           <MaterialRating
//                             name="simple-controlled"
//                             value={rating}
//                             onChange={(event, newValue) => {
//                               setRating(newValue);
//                             }}
//                           />
//                           <div className="mt-3">
//                             <label htmlFor="comment" className="form-label">
//                               Comment
//                             </label>
//                             <textarea
//                               name="comment"
//                               className="form-control"
//                               style={{ fontSize: 14 }}
//                               onChange={(e) => {
//                                 setComment(e.target.value);
//                               }}
//                               id=""
//                               rows="4"
//                             ></textarea>
//                           </div>
//                           <button
//                             type="submit"
//                             className="btn btn-primary mt-4"
//                             style={{ fontSize: 14 }}
//                           >
//                             Submit
//                           </button>
//                         </form>
//                       ) : (
//                         <div className="alert alert-info">
//                           <Link to="/signin">
//                             Please Login to Write a Review
//                           </Link>
//                         </div>
//                       )}
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>
