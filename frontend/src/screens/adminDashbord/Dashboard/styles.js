import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.light,
    height: "100vh",
    padding: theme.spacing(2),
  },
  card: {
    padding: theme.spacing(3, 2),
    borderRadius: 10,
    width: "100%",
    backgroundImage: " linear-gradient(90deg,#a1c4fd,#8740dd)",
    color: theme.palette.secondary.main,
    // fontWeight: "bold",
  },
  chart: {
    // padding: theme.spacing(2, 0),
  },
}));

export default useStyles;
