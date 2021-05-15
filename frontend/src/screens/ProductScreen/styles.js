import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(5, 0, 0, 0),
    [theme.breakpoints.down("sm")]: {
      "& .MuiGrid-root": {
        margin: 0,
        padding: 0,
      },
    },
  },
  productContent: {
    "& .MuiBreadcrumbs-root": {
      fontSize: 12,
      margin: theme.spacing(0, 0, 4),
      display: "block",
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    "& .MuiBreadcrumbs-separator": {
      margin: 0,
    },
    "& .MuiAccordionSummary-content": {
      padding: theme.spacing(1.5, 0),
    },
    "& .MuiListItem-root": {
      paddingLeft: theme.spacing(0),
    },
    [theme.breakpoints.down("md")]: {
      margin: theme.spacing(4, 0),
    },
  },
  title: {
    fontWeight: "bold",
  },
}));
export default useStyles;
