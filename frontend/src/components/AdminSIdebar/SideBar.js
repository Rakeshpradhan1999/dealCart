import React from "react";
import { dashbordData } from "./dashBordData";
import {
  Drawer,
  MenuList,
  MenuItem,
  ListItemIcon,
  Box,
  Divider,
  Avatar,
  Typography,
} from "@material-ui/core";
import useStyles from "./style";
import { AiOutlineLogout } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../redux/actions/userActions";

const SideBar = ({ url }) => {
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const classes = useStyles();
  const location = useLocation();
  const logoutHandler = () => {
    dispatch(signout());
  };
  return (
    <Drawer
      variant={"permanent"}
      anchor="left"
      className={classes.drawer}
      classes={{ paper: classes.drawer }}
    >
      <Box className={classes.drawerHeader}>
        <Avatar
          alt={userInfo.name}
          src={"/images/user.png"}
          className={classes.large}
        />
        <Typography variant="body1">Hello {userInfo.name}</Typography>
      </Box>
      <Divider color="primary" />
      <MenuList>
        {dashbordData.map((item, index) => (
          <MenuItem
            key={index}
            selected={
              `${url}/${item.link}` === location.pathname || index === 0
            }
            component={Link}
            to={`${url}/${item.link}`}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            {item.title}
          </MenuItem>
        ))}
        <Divider color={"primary"} />
        <MenuItem
          onClick={() => {
            logoutHandler();
          }}
        >
          <ListItemIcon>
            <AiOutlineLogout />
          </ListItemIcon>
          Signout
        </MenuItem>
      </MenuList>
    </Drawer>
  );
};

export default SideBar;
