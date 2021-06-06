import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { listOrderMine } from "../../redux/actions/orderAction";
import { Title, Header, Loading, Footer } from "../../components/index";
import VisibilityIcon from "@material-ui/icons/Visibility";
import {
  Container,
  Grid,
  Table,
  TableHead,
  TableContainer,
  TableRow,
  TableBody,
  TableCell,
  Paper,
  IconButton,
  Chip,
} from "@material-ui/core";
import useStyles from "./styles";
const OrderHistoryScreen = ({ history }) => {
  const classes = useStyles();
  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, error, orders } = orderMineList;
  orders && console.log();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);

  const headData = [
    "Sr No",
    "Id",
    "Date",
    "TotalPrice",
    "Paid",
    "Delivered",
    "Action",
  ];

  return (
    <>
      <Header history={history} />
      <div style={{ marginTop: "100px" }} />
      {loading ? (
        <Loading />
      ) : (
        <Container xs={12}>
          <Grid container justify="center" style={{ overflowX: "auto" }}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <TableContainer component={Paper} className={classes.root}>
                <Title text="My Orders" />
                <Table>
                  <TableHead>
                    <TableRow>
                      {headData.map((item, index) => (
                        <TableCell key={index}>{item}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders &&
                      orders.map((order, i) => (
                        <TableRow key={i}>
                          <TableCell>{i + 1}</TableCell>
                          <TableCell>{order._id}</TableCell>
                          <TableCell>
                            {order.createdAt.substring(0, 10)}
                          </TableCell>
                          <TableCell>${order.totalPrice}.00</TableCell>
                          <TableCell>
                            {order.isPaid ? (
                              <Chip
                                label="Paid"
                                className={classes.successBg}
                              />
                            ) : (
                              <Chip
                                label="Pending"
                                className={classes.nopeBg}
                              />
                            )}
                          </TableCell>
                          <TableCell>
                            {!order.isDelivered && order.isPaid ? (
                              <Chip
                                label="Processing"
                                className={classes.infoBg}
                                style={{ color: "white" }}
                              />
                            ) : order.isDelivered ? (
                              <Chip
                                label="Deliveried"
                                className={classes.successBg}
                              />
                            ) : (
                              <Chip
                                label="Pending"
                                className={classes.nopeBg}
                              />
                            )}
                          </TableCell>
                          <TableCell>
                            <IconButton
                              color="primary"
                              component={Link}
                              to={`/order/${order._id}`}
                            >
                              <VisibilityIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Container>
      )}
      <Footer />
    </>
  );
};

export default OrderHistoryScreen;

//   /* <div className="container">
// <h3 className="fs-5 fw-bold my-4">My Orders</h3>
// <div className="card card-body mt-4">
//   {loading ? (
//     <Loading/>
//   ) : error ? (
//     <div className="alert alert-danger">{error}</div>
//   ) : (
//     <div className="table-responsive">
//       <table className="table table-striped table-hover">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Date</th>
//             <th>Total Price</th>
//             <th>Paid</th>
//             <th>Delivered</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.map((item, index) => (
//             <tr key={index}>
//               <td>{item._id}</td>
//               <td>{item.createdAt.substring(0, 10)}</td>
//               <td>${item.totalPrice.toFixed(2)}</td>
//               <td>
//                 {item.isPaid ? item.paidAt.substring(0, 10) : "No"}
//               </td>
//               <td>
//                 {item.isDelivered
//                   ? item.deliverdAt.substring(0, 10)
//                   : "No"}
//               </td>
//               <td>
//                 <Link to={`/order/${item._id}`}>
//                   <button className="btn">
//                     <span className="d-flex align-items-center">
//                       <CgList />{" "}
//                       <span
//                         className="d-block ms-2 "
//                         style={{ fontSize: 14 }}
//                       >
//                         {" "}
//                         Details
//                       </span>{" "}
//                     </span>
//                   </button>
//                 </Link>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   )}
// </div>
// </div> */
