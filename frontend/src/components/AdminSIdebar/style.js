import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 230;
const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    "& .MuiListItemIcon-root": {
      transition: "all 0.3s ease",
    },
    "& .MuiListItem-button": {
      transition: "all 0.3s ease",
    },
    "& .MuiListItem-button:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.main,
      "& .MuiListItemIcon-root": {
        color: theme.palette.secondary.main,
      },
    },
    "& .MuiList-root": {
      margin: theme.spacing(2),
    },
    "& .MuiMenuItem-root": {
      padding: theme.spacing(1.5, 0, 1.5, 2),
      borderRadius: "10px",
      fontWeight: "bold",
      margin: theme.spacing(0.5, 0),
      alignItems: "center",

      "& .MuiListItemIcon-root": {
        fontSize: 18,
      },
    },
    "& .Mui-selected": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.main,
      "& .MuiListItemIcon-root": {
        color: theme.palette.secondary.main,
      },
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    padding: theme.spacing(4, 2),
    display: "flex",
    alignItems: "center",
    "& .MuiTypography-root": {
      fontWeight: "bold",
    },
  },
  large: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    margin: theme.spacing(0, 2, 0, 0),
  },
}));

export default useStyles;
