// import { createUseStyles } from 'react-jss';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    marginTop: theme.spacing(1),
  },
  imgWrapper: {
    padding: "10px",
    width: "100%",
    "& img": {
      width: "100%",
    },
  },
  contentWrapper: {
    padding: 10,
    display: "flex",
    height: "100%",
    justifyContent: "space-between",
  },
  quantity: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 100,
    width: 70,
  },
  delete: {
    color: theme.palette.error.main,
  },
  priceCard: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(1),
  },
}));

export default useStyles;
