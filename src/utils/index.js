export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

export const setUserData = (data) => {
  localStorage.setItem('user', JSON.stringify(data));
  return true;
}

export const getUserData = () => {
  let userData = localStorage.getItem('user');
  return userData ? JSON.parse(userData) : false;
}

export const setToken = (data) => {
  localStorage.setItem('token', JSON.stringify(data));
  return true;
}

export const getToken = () => {
  let token = localStorage.getItem('token');
  return token ? JSON.parse(token) : false;
}

export const numToAmount = (number = 0, dec = false) => {
  number = Number(number)
  if (number === NaN) {
    return "₹0"
  } else {
    return number.toLocaleString('en-IN', {
      maximumFractionDigits: dec ? 2 : 0,
      style: 'currency',
      currency: 'INR'
    })
  }
}