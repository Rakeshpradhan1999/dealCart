import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { listOrder } from "../../../redux/actions/orderAction";
import { Loading } from "../../../components";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import useStyle from "../styles";
import TableWrapper from "../TableWrapper";
import {
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Chip,
} from "@material-ui/core";

const Orders = ({ history }) => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  const classes = useStyle();
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders, count, total } = orderList;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrder(page, limit));
    } else {
      history.push("/signin");
    }
  }, [dispatch, history, limit, page, userInfo]);

  const rowData = [
    "Sr No.",
    "Id",
    "Date",
    "Purchase Price",
    "Payment",
    "Status",
    "Actions",
  ];

  return loading ? (
    <Loading />
  ) : (
    <TableWrapper
      title="Orders"
      limit={limit}
      page={page}
      setPage={setPage}
      setLimit={setLimit}
      count={count}
      total={total}
    >
      <TableHead>
        <TableRow>
          {rowData.map((item, i) => (
            <TableCell key={i}>{item}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {orders.length === 0 ? (
          <TableRow>
            <TableCell>Empty</TableCell>
          </TableRow>
        ) : (
          orders.map((order, i) => (
            <TableRow key={order._id}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{order._id}</TableCell>
              <TableCell>{order.createdAt.substring(0, 10)}</TableCell>
              <TableCell>{order.totalPrice}</TableCell>
              <TableCell>
                {order.isPaid ? (
                  <Chip
                    label="Paid"
                    color="primary"
                    className={classes.successBg}
                    size="small"
                  />
                ) : (
                  <Chip
                    size="small"
                    label="Pending"
                    className={classes.nopeBg}
                  />
                )}
              </TableCell>
              <TableCell>
                {order.isDelivered ? (
                  <Chip
                    size="small"
                    label="Delivered"
                    className={classes.successBg}
                  />
                ) : (
                  <Chip
                    size="small"
                    label="Pending"
                    className={classes.nopeBg}
                  />
                )}
              </TableCell>
              <TableCell>
                <IconButton
                  className={classes.info}
                  component={Link}
                  to={`/order/${order._id}`}
                >
                  <VisibilityOutlinedIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </TableWrapper>
  );
};

export default Orders;
