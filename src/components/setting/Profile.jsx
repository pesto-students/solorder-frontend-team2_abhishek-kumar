import React, { useEffect } from 'react'
import { IconButton, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, FormHelperText, Box, Button } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { setToken, setUserData, validateEmail } from '../../utils';
import settingStore from '../../zustang/setting/settingStore';
import commonStore from '../../zustang/common/commonStore';
import signInUpStore from '../../zustang/auth/signInUpStore';

const style = {
  bgcolor: 'projPrimary.main',
  margin: "auto",
  padding: 2,
};

const Profile = () => {
  const [values, setValues] = React.useState({
    name: "",
    email: "",
    password: "",
    newPassword: "",
    confirmNewPassword: "",
    error: {},
    showPassword: false,
    showNewPassword: false,
    showConfirmPassword: false,
  });
  let { getProfileData, updateProfileData } = settingStore(s => s)
  var { notify, isLoader } = commonStore(s => s)

  useEffect(() => {
    getSetProfileData()
  }, [])

  function getSetProfileData(isUpdate = false) {
    isLoader(true)
    getProfileData({
      cb: (res) => {
        isLoader(false)
        if (res.error) {
          notify(res.msg, "error")
        } else {
          let userData = res?.data || {};
          let data = {
            name: userData?.name || "",
            email: userData?.email || "",
            password: "",
            newPassword: "",
            confirmNewPassword: "",
            error: {},
            showPassword: false,
            showNewPassword: false,
            showConfirmPassword: false,
          }
          if (isUpdate) setUserData({ ...userData })
          setValues(data)
        }
      }
    })
  }

  let { error } = values;

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value, error: {} });
  };

  const handleShowNewPassword = () => {
    setValues({
      ...values,
      showNewPassword: !values.showNewPassword,
    });
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

  const onUpdate = () => {
    let {
      name,
      email,
      password,
      newPassword,
      confirmNewPassword,
    } = values

    let error = {}
    let data = {}

    if (name)
      data["name"] = name
    else
      error["name"] = "Name is required."

    if (email && validateEmail(email))
      data["email"] = email
    else if (!email)
      error["email"] = "Email is required."
    else
      error["email"] = "Enter Valid Email."

    if (password) {
      if (password.length < 8) {
        error["password"] = "Password length should be 8 characters."
      } else
        data["password"] = password

      if (newPassword && newPassword.length < 8) {
        error["newPassword"] = "New Password length should be 8 characters."
      } else if (!newPassword) {
        error["newPassword"] = "New Password is required."
      } else if (confirmNewPassword && confirmNewPassword.length < 8) {
        error["confirmNewPassword"] = "Confirm New Password length should be 8 characters."
      } else if (!confirmNewPassword) {
        error["confirmNewPassword"] = "Confirm New Password is required."
      } else if (newPassword !== confirmNewPassword) {
        error["newPassword"] = "New Password must same as Confirm New Password required."
        error["confirmNewPassword"] = "Confirm New Password must same as New Password required."
      } else {
        // data["password"] = password
        data["newPassword"] = newPassword
        data["confirmPassword"] = confirmNewPassword
      }
    } else {
      if (newPassword)
        error["password"] = "Password is required."

      if (confirmNewPassword)
        error["password"] = "Password is required."
    }

    if (Object.keys(error).length) {
      setValues({ ...values, error })
    } else {
      isLoader(true)
      updateProfileData({
        data, cb: (res) => {
          isLoader(false)
          if (res.error) {
            notify(res.msg, "error")
          } else {
            getSetProfileData(true)
            notify(res.msg, "success")
          }
        }
      })
    }
  }


  return (
    <Box sx={style}>
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
        value={values?.name}
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
        value={values?.email}
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
        <FormHelperText id="password" sx={{ visibility: error?.password ? "visible" : "hidden" }} >{error?.password ? error?.password : " "}</FormHelperText>
      </FormControl>
      <FormControl
        sx={{ marginBottom: 1 }}
        fullWidth
        variant="outlined"
        color="projDark"
        error={error?.newPassword ? true : false}
        required
      >
        <InputLabel htmlFor="password">New Password</InputLabel>
        <OutlinedInput
          id="password"
          type={values.showNewPassword ? 'text' : 'password'}
          value={values.newPassword}
          onChange={handleChange('newPassword')}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleShowNewPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showNewPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
        <FormHelperText id="password">{error?.newPassword ? error?.newPassword : " "}</FormHelperText>
      </FormControl>
      <FormControl
        variant="outlined"
        color="projDark"
        error={values?.error?.confirmNewPassword ? true : false}
        required
        fullWidth
      >
        <InputLabel htmlFor="confirmPassword">Confirm New Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={values.showConfirmPassword ? 'text' : 'password'}
          value={values.confirmNewPassword}
          onChange={handleChange('confirmNewPassword')}
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
        <FormHelperText id="confirmPassword" sx={{ visibility: error?.confirmNewPassword ? "visible" : "hidden" }}>{error?.confirmNewPassword ? error.confirmNewPassword : " "}</FormHelperText>
      </FormControl>
      <Box display="flex" justifyContent="center" mt={2}><Button variant="contained" color='success' size='large' onClick={onUpdate} >Update</Button></Box>
    </Box>
  )
}

export default Profile;