import React from 'react'
import { IconButton, Typography, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, FormHelperText, Box, Button } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const style = {
  bgcolor: 'projPrimary.main',
  margin: "auto",
};

const Profile = () => {
  const [values, setValues] = React.useState({
    password: "87654321",
    email: "testname1@test.com",
    error: {},
    showPassword: false,
  });
  let { error } = values;
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

  const handleClickShowConfirmPassword = () => {
    setValues({
      ...values,
      showConfirmPassword: !values.showConfirmPassword,
    });
  };


  return (
    <Box sx={style}>
      <TextField
        sx={{ marginTop: 2, marginBottom: 1 }}
        id="name"
        label="Name"
        variant="outlined"
        fullWidth
        error={false}
        helperText={" "}
        color="projDark"
        required
        value={""}
      // onChange={handleChange("name")}
      />
      <TextField
        sx={{ marginBottom: 1 }}
        id="name"
        label="Email"
        variant="outlined"
        fullWidth
        error={false}
        helperText={" "}
        color="projDark"
        required
        value={""}
      // onChange={handleChange("email")}
      />
      <FormControl
        sx={{ marginBottom: 1 }}
        fullWidth
        variant="outlined"
        color="projDark"
        error={false}
        required
      >
        <InputLabel htmlFor="password">Password</InputLabel>
        <OutlinedInput
          id="password"
          type={values.showPassword ? 'text' : 'password'}
          value={""}
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
        <FormHelperText id="password" sx={{ visibility: "hidden" }} >{" "}</FormHelperText>
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
          value={""}
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
      <Box display="flex" justifyContent="center"><Button variant="contained">Update</Button></Box>
    </Box>
  )
}

export default Profile;