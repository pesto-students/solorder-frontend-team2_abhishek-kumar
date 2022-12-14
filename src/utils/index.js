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