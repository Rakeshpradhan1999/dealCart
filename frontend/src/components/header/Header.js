import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../redux/actions/userActions";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Grid,
  InputBase,
  List,
  ListItem,
  Divider,
  ListItemText,
  Paper,
  Badge,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { BiShoppingBag, BiUser } from "react-icons/bi";

const useStyles = makeStyles((theme) => ({
  root: {
    flexgrow: 1,
    fontSize: "14px",
    // marginBottom: theme.spacing(5),

    "& .MuiToolbar-root": {
      minHeight: 70,
      "& .MuiBadge-badge": {
        fontSize: "10px",
      },
      "& .MuiTypography-body1": {
        fontSize: 12,
      },
    },
    "& .MuiListItem-root": {
      fontSize: "12px",
    },
    "& .MuiIconButton-root": {
      //  marginLeft: theme.spacing(2),
      fontSize: "14px",
    },
  },
  navContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    display: "none",
    "@media (max-width:1000px)": {
      display: "block",
    },
  },
  title: {
    width: "10%",
    "@media (max-width:1000px)": {
      flexGrow: 1,
    },
  },
  menu: {
    width: "30%",
    display: "block",
    "@media (max-width:1000px)": {
      display: "none",
    },
  },
  menuItems: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    listStyle: "none",
    marginBottom: "0",
  },
  navItem: {
    padding: theme.spacing(2),
  },
  search: {
    width: "50%",
    position: "relative",
    margin: theme.spacing(0, 2),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.secondary.light,
    border: "2px solid transparent",
    transition: theme.transitions.create("background-color", {
      duration: theme.transitions.duration.standard,
    }),

    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      border: `2px solid ${theme.palette.secondary.dark} `,
    },
    marginLeft: 0,
    // eslint-disable-next-line no-dupe-keys
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
    display: "block",
    "@media (max-width:1000px)": {
      display: "none",
    },
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "40ch",
    },
  },

  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#282c3f",
  },
  actionButtons: {
    width: "10%",
    display: "flex",
    justifyContent: "flex-end",
    fontSize: "inherit",
  },
  userIcon: {
    position: "relative",
    "&:hover": {
      "& .MuiPaper-root": {
        visibility: "visible",
        opacity: "1",
      },
    },
  },
  userActionMenu: {
    transition: "all 0.3s",
    position: "absolute",
    top: "110%",
    right: "0",
    width: 180,
    maxWidth: 200,
    backgroundColor: theme.palette.background.paper,
    padding: `10px`,
    visibility: "hidden",
    opacity: "0",
  },
  listItem: {
    fontSize: 12,
    padding: theme.spacing(0.5, 1),
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
}));

const Header = ({ history }) => {
  const classes = useStyles();

  const [keyword, setKeyword] = useState("");
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const cartQty = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(signout());
  };

  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
      // console.log(keyword);
      setKeyword("");
    } else {
      history.push("/");
    }
  };

  return (
    // <Router>
    <div>
      <AppBar
        elevation={2}
        color="secondary"
        className={classes.root}
        position="fixed"
      >
        {/* <Container> */}
        <Toolbar className={classes.navContainer}>
          {/* Menu Icon */}
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>

          {/* Icon */}
          <Typography
            variant="body2"
            component={Link}
            to="/"
            className={classes.title}
          >
            DealCart
          </Typography>
          {/* Menu */}
          <div className={classes.menu}>
            <Grid container className={classes.menuItems}>
              <Grid item xs={3}>
                <Link to={`/`} className={classes.navItem}>
                  {" "}
                  Men
                </Link>
              </Grid>
              <Grid item xs={3}>
                <Link to={`/`} className={classes.navItem}>
                  {" "}
                  Women
                </Link>
              </Grid>
              <Grid item xs={3}>
                <Link to={`/`} className={classes.navItem}>
                  Kids
                </Link>
              </Grid>
              <Grid item xs={3}>
                <Link to={`/`} className={classes.navItem}>
                  All
                </Link>
              </Grid>
            </Grid>
          </div>
          {/* Search bar */}
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <form action="" onSubmit={searchHandler} autoComplete="off">
              <InputBase
                placeholder="Search Products"
                onChange={(e) => setKeyword(e.target.value)}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </form>
          </div>

          {/* Action Buttons */}
          <div className={classes.actionButtons}>
            <div className={classes.userIcon}>
              <IconButton color="inherit" style={{ fontSize: 20 }}>
                <BiUser />
              </IconButton>
              <Paper
                className={classes.userActionMenu}
                style={{ zIndex: 11000 }}
              >
                <List color="secondary">
                  {userInfo ? (
                    <React.Fragment>
                      <ListItem button className={classes.listItem}>
                        <ListItemText primary={`Welcome ${userInfo.name}`} />
                      </ListItem>
                      <Divider />

                      <ListItem
                        button
                        component={Link}
                        to="/myaccount"
                        className={classes.listItem}
                      >
                        <ListItemText primary="My Account" />
                      </ListItem>

                      <ListItem
                        button
                        component={Link}
                        to="/myorders"
                        className={classes.listItem}
                      >
                        <ListItemText primary="My Orders" />
                      </ListItem>

                      {userInfo.isAdmin && (
                        <ListItem
                          button
                          component={Link}
                          to="/adminDash"
                          className={classes.listItem}
                        >
                          <ListItemText primary="Admin Dashbord" />
                        </ListItem>
                      )}
                      <ListItem
                        component={Link}
                        to="/adminDash"
                        onClick={logoutHandler}
                        button
                        className={classes.listItem}
                      >
                        <ListItemText primary="Logout" />
                      </ListItem>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <ListItem
                        button
                        component={Link}
                        to="/signin"
                        className={classes.listItem}
                      >
                        <ListItemText primary="Login" />
                      </ListItem>
                      <ListItem
                        button
                        component={Link}
                        to="/register"
                        className={classes.listItem}
                      >
                        <ListItemText primary="Register" />
                      </ListItem>
                    </React.Fragment>
                  )}
                </List>
              </Paper>
            </div>
            <IconButton color="inherit" component={Link} to="/cart">
              <Badge
                badgeContent={cartQty ? cartQty : "0"}
                color="primary"
                style={{ fontSize: 20 }}
              >
                <BiShoppingBag />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
        {/* </Container> */}
      </AppBar>
    </div>
    // </Router>
  );
};

export default Header;
