import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import commonStore from '../../zustang/common/commonStore';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SoloSnackbar() {
  const {
    isOpen,
    vertical,
    horizontal,
    msg,
    type,
    duration,
    closeNotify,
    // notify,
  } = commonStore(state => state)

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={() => closeNotify()}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <>
      <Snackbar open={isOpen} autoHideDuration={duration} onClose={() => closeNotify()} anchorOrigin={{ vertical, horizontal }} >
        <Alert onClose={() => closeNotify()} severity={type} sx={{ width: '100%' }} autoHideDuration={6000} action={action} >
          {msg}
        </Alert>
      </Snackbar>
      {/* <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert> */}
    </>
  );
}
