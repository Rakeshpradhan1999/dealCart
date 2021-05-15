import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Loading } from "../../../components";
import { usersList, deleteUser } from "../../../redux/actions/userActions";
import { FaTimes, FaUserEdit } from "react-icons/fa";
import { IoMdTrash } from "react-icons/io";
import { BiCheck } from "react-icons/bi";
import {
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
} from "@material-ui/core";
import useStyles from "../styles";
import TableWrapper from "../TableWrapper";

const Users = ({ history }) => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const classes = useStyles();
  const dispatch = useDispatch();
  const listUsers = useSelector((state) => state.listUsers);

  const { loading, error, users, count, total } = listUsers;

  const userDelete = useSelector((state) => state.userDelete);
  const { success } = userDelete;

  const userSignin = useSelector((state) => state.userSignin);

  const { userInfo } = userSignin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(usersList(page, limit));
    } else {
      history.push("/signin");
    }
  }, [dispatch, history, userInfo, success, page, limit]);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  const rowData = ["Sr No.", "Id", "Name", "Email", "Admin", "Actions"];

  return loading ? (
    <Loading />
  ) : (
    <TableWrapper
      title="Users"
      count={count}
      total={total}
      limit={limit}
      setLimit={setLimit}
      page={page}
      setPage={setPage}
    >
      <TableHead>
        <TableRow>
          {rowData.map((item, index) => (
            <TableCell key={index}>{item}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {users &&
          users.map((user, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{user._id}</TableCell>
              <TableCell className={classes.text}>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {user.isAdmin ? (
                  <IconButton className={classes.check}>
                    <BiCheck />
                  </IconButton>
                ) : (
                  <IconButton className={classes.nope}>
                    <FaTimes />
                  </IconButton>
                )}
              </TableCell>
              <TableCell>
                {
                  <>
                    <IconButton
                      className={classes.info}
                      component={Link}
                      to={`user/${user._id}/edit`}
                    >
                      <FaUserEdit />
                    </IconButton>
                    <IconButton
                      className={classes.error}
                      onClick={() => deleteUserHandler(user._id)}
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

export default Users;
