import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0, 3.8, 3, 3.8),
    borderRadius: 8,
    marginBottom: theme.spacing(3),
    "& .MuiTableHead-root": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiTableCell-head": {
        color: theme.palette.secondary.main,
        fontSize: 14,
        fontWeight: "bold",
      },
    },
  },
  text: {
    textTransform: "capitalize",
  },
  check: {
    color: theme.palette.success.main,
  },
  nope: {
    color: theme.palette.warning.dark,
  },
  error: {
    color: theme.palette.error.dark,
  },
  info: {
    color: theme.palette.info.dark,
  },
  infoBg: {
    backgroundColor: theme.palette.info.dark,
  },
  nopeBg: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.secondary.main,
  },
  successBg: {
    backgroundColor: theme.palette.success.dark,
    color: theme.palette.secondary.main,
  },
}));

export default useStyles;
