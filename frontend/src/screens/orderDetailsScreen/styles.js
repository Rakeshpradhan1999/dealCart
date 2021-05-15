import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {},
  infoCard: {
    padding: theme.spacing(0, 3.8, 3, 3.8),
    borderRadius: 8,
    marginBottom: theme.spacing(3),
  },
  textWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  price: {
    borderRadius: 8,
    padding: theme.spacing(2),
  },
}));

export default useStyles;
