import React from "react";
import { Stepper, Step, StepLabel, Hidden } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const steps = ["Login/Signup", "Address", "Payment", "Place Order"];
const mobileSteps = ["Address", "Payment", "Place Order"];

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiPaper-root": {
      backgroundColor: "transparent",
    },
  },
}));
const CheckOutSteeper = ({ activeStep }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Hidden smDown>
        <Stepper activeStep={activeStep} className="p-0">
          {steps.map((step) => {
            return (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Hidden>
      <Hidden mdUp>
        <Stepper activeStep={activeStep} className="p-0" alternativeLabel>
          {mobileSteps.map((step) => {
            return (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Hidden>
    </div>
  );
};

export default CheckOutSteeper;
// <div className='card card-header flex-row justify-content-between align-items-center'>
// 				// 	<div className='fs-6 fw-bold text-uppercase'>{mobileSteps(activeStep, steps)}</div>
// 				// 	<div className=''>{`${activeStep + 1}/4`}</div>
// 				// </div>
