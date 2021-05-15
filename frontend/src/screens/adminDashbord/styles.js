import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  bg: {
    backgroundColor: theme.palette.primary.light,
    minHeight: "130vh",
    padding: "40px 0 100px 0 ",
  },
  root: {
    padding: theme.spacing(0, 3.8, 3, 3.8),
    borderRadius: 8,
    marginBottom: theme.spacing(3),
    width: "100%",
    "& .MuiIconButton-root": {
      fontSize: "18px",
    },
    "& .MuiTableHead-root": {
      backgroundColor: theme.palette.primary.main,

      "& .MuiTableCell-head": {
        color: theme.palette.secondary.main,
        fontSize: 14,
        fontWeight: "bold",
      },
    },
  },
  headTitle: {
    marginBottom: theme.spacing(3),
    textTransform: "capitalize",
    "& h6": {
      fontWeight: "bold",
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
    backgroundColor: theme.palette.info.main,
  },

  nopeBg: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.secondary.main,
  },
  successBg: {
    backgroundColor: theme.palette.success.dark,
    color: theme.palette.secondary.main,
  },
  inputWrapper: {
    "& .MuiCircularProgress-root": {
      margin: "20px auto",
    },
    margin: "0 auto",
    "& .MuiPaper-root": {
      padding: theme.spacing(5, 3),
    },
  },
  formContainer: {},
  title: {
    marginBottom: theme.spacing(3),
  },
  dropzone: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
  },
  active: {
    borderColor: "#2196f3",
  },
  imageWrapper: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: "20px",
    "& img": {
      width: "100%",
      transition: "all 0.3s",
    },
  },
  image: {
    position: "relative",
    "&:hover": {
      "&::before": {
        opacity: 1,
      },
      "& .MuiIconButton-root": {
        opacity: 1,
      },
    },
    "&::before": {
      transition: "all 0.3s",
      content: "''",
      position: "absolute",
      top: 0,
      left: 0,
      backgroundColor: "rgba(0,0,0,0.4)",
      height: "calc(100% - 5px)",
      width: "100%",
      opacity: 0,
    },
  },
  trash: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: theme.palette.error.main,
    opacity: 0,
  },
}));

export default useStyles;
