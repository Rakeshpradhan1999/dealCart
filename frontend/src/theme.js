import { createMuiTheme } from "@material-ui/core/styles";

//create a theme instance
export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#8740dd",
      light: "#F5F7FF",
      hover: "#9251e39c",
    },
    secondary: {
      main: "#fff",
      light: "#f5f5f6",
      dark: "#e9efe7",
    },
  },
  typography: {
    fontFamily: "inherit",
    fontWeight: 400,
    body1: {
      fontSize: "0.9rem",
    },
  },
  overrides: {
    // "& .MuiTypography-body1": {
    //   fontSize: "14px",
    // },
    // "& .MuiTypography-body2": {
    //   fontSize: "12px",
    // },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "red",
    },
    "& .MuiOutlinedInput-root": {
      "&:hover": {
        border: "1px solid #8740dd",

        borderColor: "#8740dd",
        "& .MuiOutlinedInput-notchedOutline": {
          border: "1px solid #8740dd",
        },
      },
    },
    " & .MuiTextField-root": {
      fontSize: 14,
      "&:hover": {
        border: "1px solid #8740dd",
      },
    },
    MuiCssBaseline: {
      "@global": {
        html: {
          WebkitFontSmoothing: "auto",
        },
        body: {
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: "400",
          fontSize: "14px",
          backgroundColor: "#Fffff",
        },
        fieldset: {
          "&:focus": {
            outline: "-webkit-focus-ring-color auto 0px",
          },
        },
        a: {
          color: "inherit",
          textDecoration: "none",
          "&:hover": {
            // color: "white",
            textDecoration: "none",
          },
        },
        ul: {
          listStyle: "none",
          padding: "10px",
        },
        li: {
          padding: "5px",
        },
        svg: {
          display: "block",
        },

        button: {
          border: 0,
          color: "rgba(0,0,0,0.8)",
          padding: 5,
          fontSize: 14,
          backgroundColor: "transparent",
        },
      },
    },
  },
});
