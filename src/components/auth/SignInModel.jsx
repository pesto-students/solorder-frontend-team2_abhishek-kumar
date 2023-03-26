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
import cartStore from '../../zustang/menucheckout/cartStore';

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

  const { modelOpen: isOpen, handleModel: handleModle, signUpHandleModel, signIn, forgetPassHandleModel } = signInUpStore(state => state)
  const { isLoader, notify } = commonStore(s => s)
  const [values, setValues] = React.useState({
    password: "1234567890",
    email: "testuser@pestoproject.com",
    error: {},
    showPassword: false,
  });

  const {
    setCartUserId
  } = cartStore(s => s)

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

  const openForgetPass = (e) => {
    e?.preventDefault();
    forgetPassHandleModel(true);
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
          let { data, error, msg, token } = res
          if (!error) {
            closeSignIn()
            notify(msg, 'success')
            setUserData(data)
            setToken(token)
            if (data?.role_id === 1) {
              setCartUserId(data?.user_id)
              if (window?.location?.reload) window.location.reload(false)
            } else if ((data?.role_id === 2) && data?.restaurant_id) {
              if (window?.location?.replace) window.location.replace(('/registration/' + data.restaurant_id))
            }
            isLoader(false)
          } else {
            notify(msg, 'error')
            isLoader(false)
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
        <Typography variant='p' component="div" fontWeight={500}>or <span style={{ color: "#F53C3C", cursor: "pointer" }} onClick={(e) => openSignUp(e)}>Create an account.</span></Typography>
        <TextField
          sx={{ marginTop: 2 }}
          id="email"
          label="Email"
          variant="outlined"
          fullWidth
          error={values?.error?.email ? true : false}
          helperText={values.error.email ? values.error.email : " "}
          color="projDark"
          required
          value={values.email}
          onChange={handleChange('email')}
        />
        <FormControl sx={{ marginTop: 1 }} fullWidth variant="outlined" error={values?.error?.password ? true : false} color="projDark" required>
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
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          <FormHelperText id="my-helper-text" sx={{ visibility: values?.error?.password ? "visible" : "hidden" }}>{values?.error?.password ? values?.error?.password : " "}</FormHelperText>
        </FormControl>
        <Typography variant='p' component="div" fontWeight={500} sx={{ color: "#F53C3C", cursor: "pointer" }} onClick={(e)=>{openForgetPass(e)}}>Forgot Password?</Typography>
        <SignInBtn onClick={onSignIn}>Sign In</SignInBtn>
      </Box>
    </Modal>
  );
}

export default SignInModel;