import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  header: {
    padding: theme.spacing(1.5),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  formControl: {
    margin: theme.spacing(1),
    // minwidth: "100%",
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  headertext: {
    // fontWeight: "bold",
    textTransform: "capitalize",
  },
  sidebar: {
    marginTop: theme.spacing(8),

    "& .MuiDivider-root": {
      marginTop: theme.spacing(1.5),
    },
  },
  ratingfilter: {
    "& .MuiSvgIcon-root": {
      fontSize: "14px",
    },
  },
  title: {
    marginBottom: theme.spacing(4),
    fontWeight: "bold",
  },
}));

export default useStyles;
