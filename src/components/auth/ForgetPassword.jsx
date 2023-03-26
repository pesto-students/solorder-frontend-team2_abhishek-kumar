import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import signInUpStore from '../../zustang/auth/signInUpStore';
import { IconButton, Typography, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, Button, FormHelperText, Checkbox } from '@mui/material';
import styled from '@emotion/styled';
import CloseIcon from '@mui/icons-material/Close';
import commonStore from '../../zustang/common/commonStore';
import { validateEmail } from '../../utils';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'projPrimary.main',
  padding: "7px 10px"
};

function ForgetPassword() {
  const [values, setValues] = useState({
    email: "",
    otp: "",
    error: {},
    showPassword: false,
    showConfirmPassword: false,
    password: "",
    confirmPassword: "",
  })
  const [step, setStep] = useState(1)
  const { forgetPassModelOpen, forgetPassHandleModel, handleModel, sendOtp, validateOtp, updatePasswordViaOtp } = signInUpStore(s => s)
  const { isLoader, notify } = commonStore(s => s)

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleClickShowConfirmPassword = () => {
    setValues({
      ...values,
      showConfirmPassword: !values.showConfirmPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const openSignUp = (e) => {
    e?.preventDefault();
    handleModel(true);
    forgetPassHandleModel(false);
    setValues({
      email: "",
      otp: "",
      error: {}
    })
    setStep(1)
  }

  const SignInBtn = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(theme.palette.projSecondary.main),
    width: "100%",
    borderRadius: "5px",
    backgroundColor: theme.palette.projSecondary.main,
    margin: "5px 0px 10px 0px",
    '&:hover': {
      color: theme.palette.getContrastText(theme.palette.projSecondary.darker),
      width: "100%",
      borderRadius: "5px",
      backgroundColor: theme.palette.projSecondary.darker,
      margin: "5px 0px 10px 0px",
    },
  }));

  const handleChange = (name) => (event) => {
    let value = event.target.value
    if ((name === "otp") && (String(value).length > 4))
      return   
    setValues({ ...values, [name]: value, error: {} });
  };

  const onSubmitEmail = (e) => {
    e?.preventDefault();
    let error = {}
    let { email } = values
    if (!email)
      error['email'] = "Email is required."
    else if (!validateEmail(email))
      error['email'] = "Enter valid email."

    if (Object.keys(error).length) {
      setValues({ ...values, error });
    } else {
      isLoader(true)
      sendOtp({
        data: {
          email
        },
        cb: (res) => {
          let { msg, error } = res
          isLoader(false)
          if (error) {
            notify(msg, 'error')
          } else {
            notify(msg, 'success')
            setStep(2)
          }
        }
      })
    }
  }

  const onSubmitOtp = (e) => {
    e?.preventDefault();
    let error = {}
    let { otp, email } = values
    if (!otp)
      error['otp'] = "OTP is required."
    else if (String(otp).length < 4)
      error['otp'] = "OTP is must be 4 digit."

    if (Object.keys(error).length) {
      setValues({ ...values, error });
    } else {
      isLoader(true)
      validateOtp({
        data: {
          email,
          otp:Number(otp)
        },
        cb: (res) => {
          isLoader(false)
          let { msg, error } = res
          if (error) {
            notify(msg, 'error')
          } else {
            notify(msg, 'success')
            setStep(3)
          }
        }
      })
    }
  }

  const onSubmitPass = (e) => {
    e?.preventDefault();
    let error = {}
    let { otp, email, confirmPassword, password } = values
    if (!password)
      error['password'] = "Password is required."
    if (!confirmPassword)
      error['confirmPassword'] = "Confirm Password is required."
    if (password && confirmPassword && (password !== confirmPassword))
      error['confirmPassword'] = "Password does not match."

    if (Object.keys(error).length) {
      setValues({ ...values, error });
    } else {
      isLoader(true)
      updatePasswordViaOtp({
        data: { otp: Number(otp), email, password },
        cb: (res) => {
          isLoader(false)
          let { msg, error } = res
          if (error) {
            notify(msg, 'error')
          } else {
            notify(msg, 'success')
            openSignUp()
          }
        }
      })
    }
  }

  return (
    <Modal
      open={forgetPassModelOpen}
      // onClose={(e) => signUpHandleModel(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box display={"flex"} justifyContent="end"><IconButton onClick={(e) => forgetPassHandleModel(false)}><CloseIcon color='projDark' /></IconButton></Box>
        <Typography variant='h5' component="div" fontWeight={500} marginTop="-25px">Forget Password</Typography>
        <Typography variant='p' component="div" fontWeight={500}>or <span style={{ color: "#F53C3C", cursor: "pointer" }} onClick={(e) => openSignUp(e)}>Sign In to your account.</span></Typography>
        {step === 1 ? <>
          <TextField
            sx={{ marginTop: 2 }}
            id="email"
            label="Email"
            variant="outlined"
            fullWidth
            error={values?.error?.email ? true : false}
            helperText={values.error.email ? values.error.email : "OTP will be send to your email."}
            color="projDark"
            required
            value={values.email}
            onChange={handleChange('email')}
          />
          <SignInBtn onClick={onSubmitEmail}>Submit</SignInBtn>
        </> : step === 2 ? <>
          <TextField
            sx={{ marginTop: 2 }}
            id="otp"
            label="OTP"
            variant="outlined"
            type="number"
            fullWidth
            error={values?.error?.otp ? true : false}
            helperText={values.error.otp ? values.error.otp : <>Enter the 4 digit OTP. <span style={{ color: "#F53C3C", cursor: "pointer" }} onClick={onSubmitEmail}>Resend</span></>}
            color="projDark"
            required
            value={values.otp}
            onChange={handleChange('otp')}
          />
          <SignInBtn onClick={onSubmitOtp}>Verify</SignInBtn>
        </> : step === 3 ?
          <>
            <FormControl
              sx={{ marginBottom: 1, marginTop:1 }}
              fullWidth
              variant="outlined"
              color="projDark"
              error={values.error?.password ? true : false}
              required
            >
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"
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
              <FormHelperText id="password" sx={{ visibility: values.error?.password ? "visible" : "hidden" }} >{values.error?.password ? values.error.password : " "}</FormHelperText>
            </FormControl>
            <FormControl
              variant="outlined"
              color="projDark"
              error={values?.error?.confirmPassword ? true : false}
              required
              fullWidth
            >
              <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showConfirmPassword ? 'text' : 'password'}
                value={values.confirmPassword}
                onChange={handleChange('confirmPassword')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="confirmPassword"
              />
              <FormHelperText id="confirmPassword" sx={{ visibility: values.error?.confirmPassword ? "visible" : "hidden" }}>{values.error?.confirmPassword ? values.error.confirmPassword : " "}</FormHelperText>
            </FormControl>
            <SignInBtn onClick={onSubmitPass}>Submit</SignInBtn>
          </> : ""}
      </Box>
    </Modal >
  );
}

export default ForgetPassword;