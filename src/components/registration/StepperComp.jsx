import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import restaurantStore from "../../zustang/restaurant/restaurantStore";

const steps = [
  "Restaurant Details",
  "Upload Photos",
  "Setup Menu",
  "Choose Plan"
];

export default function StepperComp() {
  var { restDetails } = restaurantStore(s => s)

  return (
    <Box sx={{ width: "100%", bgcolor: "projPrimary.main", pt: 3, pb: 2, mb: 1 }}>
      <Stepper activeStep={restDetails?.stepCompleted || 0} alternativeLabel >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
