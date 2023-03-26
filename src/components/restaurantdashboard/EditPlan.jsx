import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MenuCard from '../menuCard';
import SelectPlan from '../registration/SelectPlan';
import { Typography } from '@mui/material';

const EditPlan = (props) => {
  return (
    <Stack spacing={2} alignItems="center" p={2}>
      <Typography variant="h6" component="div" textAlign="center" width="100%" padding="5px 5px">Current Plan Expires in {props?.restDetails?.daysToExpire || 0} days</Typography>
      <SelectPlan {...props} />
    </Stack>
  )
}

export default EditPlan;