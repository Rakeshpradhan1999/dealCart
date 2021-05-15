import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {},
  infoCard: {
    padding: theme.spacing(0, 3.8, 3, 3.8),
    borderRadius: 8,
    marginBottom: theme.spacing(3),
    "& .MuiFormGroup-root": {
      display: "inline-block",
    },
  },
}));

export default useStyles;
