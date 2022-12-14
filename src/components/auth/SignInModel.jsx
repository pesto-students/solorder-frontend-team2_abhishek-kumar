import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import signInUpStore from '../../zustang/auth/signInUpStore';
import { IconButton, Typography, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, Button, FormHelperText } from '@mui/material';
import styled from '@emotion/styled';
import CloseIcon from '@mui/icons-material/Close';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import commonStore from '../../zustang/common/commonStore';
import { setToken, setUserData, validateEmail } from '../../utils';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'projPrimary.main',
  padding: "7px 10px 10px 10px"
};

function SignInModel() {

  const { modelOpen: isOpen, handleModel: handleModle, signUpHandleModel, signIn } = signInUpStore(state => state)
  const { isLoader, notify } = commonStore(s => s)
  const [values, setValues] = React.useState({
    password: "87654321",
    email: "testname1@test.com",
    error: {},
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value, error: {} });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const openSignUp = (e) => {
    e?.preventDefault();
    signUpHandleModel(true);
    handleModle(false);
  }

  const closeSignIn = (e) => {
    e?.preventDefault();
    handleModle(false);
    setValues({
      password: "",
      email: "",
      error: {},
      showPassword: false,
    })
  }


  const onSignIn = (e) => {
    e?.preventDefault();
    let error = {}
    let { email, password } = values
    if (!email)
      error['email'] = "Email is required."
    else if (!validateEmail(email))
      error['email'] = "Enter valid email."

    if (!password)
      error['password'] = "Password is required."
    else if (password.length < 8)
      error['password'] = "Password must be min 8 length."

    if (Object.keys(error).length) {
      setValues({ ...values, error });
    } else {
      isLoader(true)
      signIn({
        data: { email, password },
        cb: (res) => {
          isLoader(false)
          let { data, error, msg, token } = res
          if (!error) {
            closeSignIn()
            notify(msg, 'success')
            setUserData(data)
            setToken(token)
          } else {
            notify(msg, 'error')
          }
        }
      })
    }
  }

  const SignInBtn = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(theme.palette.projSecondary.main),
    width: "100%",
    borderRadius: "5px",
    backgroundColor: theme.palette.projSecondary.main,
    marginTop: "10px",
    '&:hover': {
      color: theme.palette.getContrastText(theme.palette.projSecondary.darker),
      width: "100%",
      borderRadius: "5px",
      backgroundColor: theme.palette.projSecondary.darker,
      marginTop: "10px",
    },
  }));


  return (
    <Modal
      open={isOpen}
      // onClose={(e) => handleModle(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box display={"flex"} justifyContent="end"><IconButton onClick={closeSignIn}><CloseIcon color='projDark' /></IconButton></Box>
        <Typography variant='h5' component="div" fontWeight={500} marginTop="-25px">Sign In</Typography>
        <Typography variant='p' component="div" fontWeight={500}>or <span style={{ color: "#F53C3C" }} onClick={(e) => openSignUp(e)}>Create an account.</span></Typography>
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          error={values?.error?.email ? true : false}
          helperText={values.error.email ? values.error.email : ""}
          color="projDark"
          required
          value={values.email}
          onChange={handleChange('email')}
        />
        <FormControl fullWidth margin="normal" variant="outlined" error={values?.error?.password ? true : false} color="projDark" required>
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          {values?.error?.password ? <FormHelperText id="my-helper-text">{values.error.password}</FormHelperText> : <></>}
        </FormControl>
        <SignInBtn onClick={onSignIn}>Sign In</SignInBtn>
      </Box>
    </Modal>
  );
}

export default SignInModel;