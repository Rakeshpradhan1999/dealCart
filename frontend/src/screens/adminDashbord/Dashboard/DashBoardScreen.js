import React from "react";
import { Typography, Grid, Paper, Box } from "@material-ui/core";
import useStyles from "./styles";
import cardData from "./data";
// import axios from "axios";
import DashChart from "./Chart";

const Dashboard = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12}>
          <Box margin={1}>
            <Typography variant="h5">Welcome Admin</Typography>
            <Typography variant="subtitle2">
              Everything is seems Good...
            </Typography>
          </Box>
        </Grid>
        {cardData.map((item, index) => (
          <Grid item lg={3} key={index}>
            <Card classes={classes} item={item} />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Paper className={classes.chart}>
            <DashChart />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

function Card({ classes, item }) {
  return (
    <Paper
      style={{ backgroundImage: item.background }}
      className={classes.card}
    >
      <Typography variant="h6" style={{ fontWeight: "bold" }}>
        {item.title}
      </Typography>
      <Typography variant="h4">{item.number}</Typography>
      <Typography variant="subtitle2">{item.subtitle}</Typography>
    </Paper>
  );
}
export default Dashboard;

// const today = new Date();
// // today.setDate(today.getDate() - 7);
// const day = today.getDate();
// // console.log(day);
// function getDayName(dateStr, locale) {
//   var date = new Date(dateStr);
//   return date.toLocaleDateString(locale, { weekday: "long" });
// }
// [1, 2, 3, 4, 5, 6, 7].map((i) => {
//   var today = new Date();
//   today.setDate(today.getDate() - i);
//   var dateStr = today.toLocaleDateString();
//   var day = getDayName(dateStr, "en-US");
//   console.log(i);
// });

// function getWeekDays(locale) {
//   var baseDate = new Date(Date.UTC(2021, 4, 16)); // just a Monday
//   var weekDays = [];
//   for (let i = 0; i < 7; i++) {
//     weekDays.push(baseDate.toLocaleDateString(locale, { weekday: "long" }));
//     baseDate.setDate(baseDate.getDate() + 1);
//   }
//   return weekDays;
// }

// var weekDays = getWeekDays();
// // console.log(weekDays);
// "en-IN", { weekday: "long" }

//
// const [products, setProducts] = useState([]);
// const [loading, setLoading] = useState(false);

// //get Date and format as require
// const date = new Date();
// let D = date.getDate() + 1;
// let M = date.getMonth() + 1;
// let y = date.getFullYear();
// let todate = y + "-" + M + "-" + D;

// date.setDate(date.getDate() - 7);
// let Day = date.getDate();
// let Month = date.getMonth() + 1;
// let year = date.getFullYear();
// let fdate = year + "-" + Month + "-" + Day;

// useEffect(() => {
//   try {
//     const fetchProducts = async () => {
//       setLoading(true);
//       const { data } = await axios.get(
//         `/api/products/filterd?from=${fdate}&to=${todate}`
//       );
//       setProducts(data);
//       setLoading(false);
//     };
//     fetchProducts();
//   } catch (err) {
//     console.log(err);
//   }
// }, [fdate, todate]);
// const getpro = () => {
//   if (!loading && products.length !== 0) {
//     return products.filter(
//       (product) => product.createdAt.substring(0, 10) === "2021-04-16"
//     );
//   }
// };

// const getted = getpro();
// console.log(getted);
