import React from "react";
// import { styles } from "./styles";
import useStyles from "./styles";
import { FiTrash2 } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { cartAction } from "../../redux/actions/cartAction";
import {
  Paper,
  Grid,
  Typography,
  Box,
  Divider,
  FormControl,
  Select,
  MenuItem,
  IconButton,
  InputLabel,
  Button,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const LgCart = ({ item, removeHandler, trashbtn = true, qty = true }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  let stock = 0;
  item.stock >= 10 ? (stock = 10) : (stock = item.stock);
  const count = [...Array(stock).keys()];

  const cartUpdate = (e) => {
    const qty = Number(e.target.value);
    dispatch(cartAction(item._id, qty));
  };

  const truncateText = (text, limit) => {
    if (item.name.length > limit) {
      return text.substring(0, limit) + "...";
    } else {
      return text;
    }
  };
  const cardText = truncateText(item.name, 25);
  return (
    <Box className={classes.cardRoot}>
      <Divider />
      <Paper elevation={0}>
        <Grid container>
          <Grid item xs={12} sm={3} md={2} lg={2}>
            <Box className={classes.imgWrapper}>
              <img src={item.images[0]} alt={item.title} />
            </Box>
          </Grid>
          <Grid item xs={12} sm={9} md={10} lg={10}>
            <Grid container>
              <Grid item xs={12}>
                <Box className={classes.contentWrapper}>
                  <Box>
                    <Typography variant="body1">{cardText}</Typography>
                    <Box mt={2}>
                      <Typography variant="body2">{item.brand}</Typography>
                    </Box>
                    <Box mt={1}>
                      <Typography
                        variant="body2"
                        color="primary"
                        style={{ fontWeight: "bold" }}
                      >
                        ${item.price}.00
                      </Typography>
                    </Box>
                  </Box>
                  <Box className={classes.quantity}>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                      size="small"
                    >
                      {qty && (
                        <React.Fragment>
                          <InputLabel id="quantity">Quantity</InputLabel>
                          <Select
                            id="quantity"
                            value={item.qty}
                            onChange={cartUpdate}
                            label="Quantity"
                          >
                            {count.map((num) => (
                              <MenuItem key={num + 1} value={num + 1}>
                                {num + 1}
                              </MenuItem>
                            ))}
                          </Select>
                        </React.Fragment>
                      )}
                    </FormControl>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box mt={3} className={classes.actionsWrapper}>
                  <Typography variant="subtitle1"></Typography>
                  {trashbtn && (
                    <Button
                      style={{ fontSize: 12, textTransform: "capitalize" }}
                      onClick={() => removeHandler(item._id)}
                      startIcon={<DeleteIcon fontSize="small" />}
                      size="small"
                      color="primary"
                      // className={classes.delete}
                    >
                      Remove Item
                    </Button>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default LgCart;

// <Grid item xs={3}>
//           <Box className={classes.imageWrapper}>
//             <Avatar
//               src={item.images[0]}
//               variant="square"
//               className={classes.avatar}
//             />
//           </Box>
//         </Grid>
//         <Grid item xs={9}>
//           <div className="card-body">
//             <h6 className="card-title">{item.title}</h6>
//             <p className="card-text fs-6">{item.name}</p>
//             <span className="card-title">
//               <span className="fw-bold"> Rs</span> {item.price}
//             </span>
//           </div>
//         </Grid>
//         <Grid item xs={4} className={`${classes.cardActions}`}>
//           <div className="d-flex align-items-center">
//             {qty && (
//               <React.Fragment>
//                 <span>Qty:</span>
//                 <select
//                   className="form-select border-0 "
//                   value={item.qty}
//                   onChange={cartUpdate}
//                 >
//                   {count.map((num) => (
//                     <option key={num + 1} value={num + 1}>
//                       {num + 1}
//                     </option>
//                   ))}
//                 </select>
//               </React.Fragment>
//             )}
//           </div>
//           {trashbtn && (
//             <button onClick={() => removeHandler(item._id)}>
//               <div className={classes.trash}>
//                 <FiTrash2 />
//               </div>
//             </button>
//           )}
//         </Grid>
