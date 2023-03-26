import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import signInUpStore from '../../zustang/auth/signInUpStore';
import { IconButton, Typography, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, Button, FormHelperText, Checkbox } from '@mui/material';
import styled from '@emotion/styled';
import CloseIcon from '@mui/icons-material/Close';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { validateEmail } from '../../utils';
import commonStore from '../../zustang/common/commonStore';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'projPrimary.main',
  padding: "7px 10px"
};

function SignUpModel() {

  const [values, setValues] = React.useState({
    name: "",
    email: "",
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false,
    isOwner: false,
    error: {},
  });

  let { name, email, password, confirmPassword, isOwner, error } = values;

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: (prop === 'isOwner') ? event.target.checked : event.target.value, error: {} });
  };

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

  const signUpHandleModel = signInUpStore(state => state.signUpHandleModel)
  const signUpModelOpen = signInUpStore(state => state.signUpModelOpen)
  const signInHandleModel = signInUpStore(state => state.handleModel)
  const signUp = signInUpStore(state => state.signUp)
  const { isLoader, notify } = commonStore(s => s)

  const openSignIn = (e) => {
    e?.preventDefault();
    setValues({
      name: "",
      email: "",
      password: '',
      confirmPassword: '',
      showPassword: false,
      showConfirmPassword: false,
      isOwner: false,
      error: {},
    })
    signInHandleModel(true);
    signUpHandleModel(false);
  }

  const onSignUp = (e) => {
    e?.preventDefault();
    let error = {}
    if (!name)
      error['name'] = "Name is required."
    if (!email)
      error['email'] = "Email is required."
    else if (!validateEmail(email))
      error['email'] = "Enter Valid Email."

    if (!password)
      error['password'] = "Password is required."
    else if (password.length < 8)
      error['password'] = "Password must be min 8 length."

    if (!confirmPassword)
      error['confirmPassword'] = "Confirm Password is required."
    else if (password !== confirmPassword)
      error['confirmPassword'] = "Password does not match."

    if (Object.keys(error).length) {
      setValues({ ...values, error })
    } else {
      let data = {
        name,
        email,
        password,
        role_id: isOwner ? 2 : 1,
      }
      isLoader(true)
      signUp({
        data, cb: (res) => {
          isLoader(false)
          let { error, msg } = res
          if (!error) {
            openSignIn()
            notify(msg, 'success')
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
    margin: "5px 0px 10px 0px",
    '&:hover': {
      color: theme.palette.getContrastText(theme.palette.projSecondary.darker),
      width: "100%",
      borderRadius: "5px",
      backgroundColor: theme.palette.projSecondary.darker,
      margin: "5px 0px 10px 0px",
    },
  }));


  return (
    <Modal
      open={signUpModelOpen}
      // onClose={(e) => signUpHandleModel(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box display={"flex"} justifyContent="end"><IconButton onClick={(e) => signUpHandleModel(false)}><CloseIcon color='projDark' /></IconButton></Box>
        <Typography variant='h5' component="div" fontWeight={500} marginTop="-25px">Sign Up</Typography>
        <Typography variant='p' component="div" fontWeight={500}>or <span style={{ color: "#F53C3C", cursor: "pointer" }} onClick={(e) => openSignIn(e)}>Sign In to your account.</span></Typography>
        <TextField
          sx={{ marginTop: 2, marginBottom: 1 }}
          id="name"
          label="Name"
          variant="outlined"
          fullWidth
          error={error?.name ? true : false}
          helperText={error?.name ? error.name : " "}
          color="projDark"
          required
          value={name}
          onChange={handleChange("name")}
        />
        <TextField
          sx={{ marginBottom: 1 }}
          id="name"
          label="Email"
          variant="outlined"
          fullWidth
          error={error?.email ? true : false}
          helperText={error?.email ? error.email : " "}
          color="projDark"
          required
          value={email}
          onChange={handleChange("email")}
        />
        <FormControl
          sx={{ marginBottom: 1 }}
          fullWidth
          variant="outlined"
          color="projDark"
          error={error?.password ? true : false}
          required
        >
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            type={values.showPassword ? 'text' : 'password'}
            value={password}
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
          <FormHelperText id="password" sx={{ visibility: error?.password ? "visible" : "hidden" }} >{error?.password ? error.password : " "}</FormHelperText>
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
            value={confirmPassword}
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
          <FormHelperText id="confirmPassword" sx={{ visibility: error?.confirmPassword ? "visible" : "hidden" }}>{error?.confirmPassword ? error.confirmPassword : " "}</FormHelperText>
        </FormControl>
        <Checkbox id="isOwner" aria-label='isOwner' checked={isOwner} onChange={handleChange('isOwner')} />
        <Typography
          htmlFor="isOwner"
          variant='p'
          component="label">
          I am a food place owner.
        </Typography>
        <SignInBtn onClick={onSignUp}>Sign Up</SignInBtn>
      </Box>
    </Modal >
  );
}

export default SignUpModel;