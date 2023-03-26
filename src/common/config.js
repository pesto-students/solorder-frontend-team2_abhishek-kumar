const config = {
  SENTRY_DNS: process.env.REACT_APP_SENTRY_DNS,
  PROD_BE_URL: process.env.REACT_APP_PROD_BE_URL,
  LOCAL_BE_URL: process.env.REACT_APP_LOCAL_BE_URL,
  NODE_ENV: process.env.NODE_ENV,
  RAZOR_KEY_ID: process.env.REACT_APP_RAZOR_KEY_ID,
  PROD_FE_URL: process.env.REACT_APP_PROD_FE_URL,
  LOCAL_FE_URL: process.env.REACT_APP_LOCAL_FE_URL,
  ORDER_STATUS_LIST: process.env.REACT_APP_ORDER_STATUS_LIST
}

export default config;