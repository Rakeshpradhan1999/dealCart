import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Loading } from "../../../components";
import { Link } from "react-router-dom";
// import { Error, Loading } from "../../components/index";
import {
  listProducts,
  productDelete,
} from "../../../redux/actions/productAction";
import { FaUserEdit } from "react-icons/fa";
import { IoMdTrash } from "react-icons/io";
import { PRODUCT_CREATE_RESET } from "../../../redux/types/productType";
import TableWrapper from "../TableWrapper";
import {
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
} from "@material-ui/core";
import useStyles from "../styles";

const Products = ({ history }) => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const classes = useStyles();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, count, total } = productList;

  const deletProduct = useSelector((state) => state.deletProduct);
  const { success, loading: deletLoading, error: deleteError } = deletProduct;

  const createProduct = useSelector((state) => state.createProduct);
  const {
    success: createSuccess,
    loading: createLoading,
    error: createError,
    product: createdProduct,
  } = createProduct;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo.isAdmin) {
      history.push("/signin");
    }

    if (createSuccess) {
      history.push(`products/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts("", limit, page));
    }
  }, [
    dispatch,
    success,
    createSuccess,
    createdProduct,
    userInfo,
    history,
    page,
    limit,
  ]);

  const deleteHandler = (id) => {
    dispatch(productDelete(id));
  };

  const rowData = [
    "Sr No.",
    "Id",
    "Title",
    "Rating",
    "Category",
    "Price",
    "Action",
  ];

  return loading || createLoading || deletLoading ? (
    <Loading />
  ) : (
    <TableWrapper
      title="Products"
      add
      count={count}
      page={page}
      setPage={setPage}
      limit={limit}
      setLimit={setLimit}
      total={total}
    >
      <TableHead>
        <TableRow>
          {rowData.map((data, index) => (
            <TableCell key={index}>{data}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {products.map((product, index) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{product._id}</TableCell>
            <TableCell>{product.title}</TableCell>
            <TableCell>{product.rating}</TableCell>
            <TableCell>{product.category}</TableCell>
            <TableCell>${product.price}.00</TableCell>
            <TableCell>
              {
                <>
                  <IconButton
                    className={classes.info}
                    component={Link}
                    to={`products/${product._id}/edit`}
                  >
                    <FaUserEdit />
                  </IconButton>
                  <IconButton
                    className={classes.error}
                    onClick={() => deleteHandler(product._id)}
                  >
                    <IoMdTrash />
                  </IconButton>
                </>
              }
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </TableWrapper>
  );
};

export default Products;
