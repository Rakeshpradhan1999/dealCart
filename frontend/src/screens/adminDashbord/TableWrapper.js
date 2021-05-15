import React, { useEffect } from "react";
import {
  Table,
  TableContainer,
  Box,
  Paper,
  Container,
  Grid,
  TablePagination,
  Button,
  Typography,
} from "@material-ui/core";

import useStyles from "./styles";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch } from "react-redux";
import { productCreate } from "../../redux/actions/productAction";
import { Title } from "../../components";
const TableWrapper = ({
  children,
  title,
  add = false,
  page,
  setPage,
  limit,
  setLimit,
  count,
  total,
}) => {
  const classes = useStyles();
  // const createProduct = useSelector((state) => state.createProduct);
  const dispatch = useDispatch();

  const createHandler = () => {
    dispatch(productCreate());
  };
  const handleChangeRowsPerPage = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className={classes.bg}>
      <Container xs={12}>
        <Grid container spacing={3} style={{ width: "100%" }}>
          {/* add product button for only Product page */}
          {add && (
            <Grid item xs={12} style={{ textAlign: "right" }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={createHandler}
              >
                Add Product
              </Button>
            </Grid>
          )}
          <Grid item xs={12}>
            <Paper className={classes.root}>
              <Box className={classes.headTitle}>
                <Title text={title} />
              </Box>
              <Grid item xs={12}>
                <TableContainer>
                  <Table>{children}</Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10]}
                  component="div"
                  count={total}
                  rowsPerPage={limit}
                  page={page}
                  onChangePage={(e, newpage) => setPage(newpage)}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default TableWrapper;
