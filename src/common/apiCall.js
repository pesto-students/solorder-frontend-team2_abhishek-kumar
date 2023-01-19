import axios from "axios";
import { getToken } from "../utils";
import config from "./config";

function apiCall({ url, method, data, headers, cb, loader, alert, onUploadProgress, onDownloadProgress }) {

  if (!url) { console.warn("url not present api call."); return }
  method = method || 'get';
  data = data || {};
  headers = headers || null;
  cb = cb || (() => { });
  loader = loader || false;
  alert = alert || false;
  onUploadProgress = onUploadProgress || (() => { });
  onDownloadProgress = onDownloadProgress || (() => { });
  let token = getToken()
  headers = headers ? {
    ...headers,
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Expires': '0',
  } : {
    "Content-Type": "application/json",
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Expires': '0',
  };
  if (token) headers['token'] = token;

  // For reference of axois config : https://axios-http.com/docs/req_config
  axios({
    // `url` is the server URL that will be used for the request
    url: url,

    // `method` is the request method to be used when making the request
    method: method,

    // `baseURL` will be prepended to `url` unless `url` is absolute.
    // It can be convenient to set `baseURL` for an instance of axios to pass relative URLs
    // to methods of that instance.
    baseURL: config.NODE_ENV === "production" ? config.PROD_BE_URL : config.LOCAL_BE_URL,

    // `headers` are custom headers to be sent
    headers: headers,

    // `data` is the data to be sent as the request body
    // Only applicable for request methods 'PUT', 'POST', 'DELETE', and 'PATCH'
    // When no `transformRequest` is set, must be of one of the following types:
    // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
    // - Browser only: FormData, File, Blob
    // - Node only: Stream, Buffer
    data: data,

    // `timeout` specifies the number of milliseconds before the request times out.
    // If the request takes longer than `timeout`, the request will be aborted.
    timeout: 12000, // default is `0` (no timeout)


    // `onUploadProgress` allows handling of progress events for uploads
    // browser only
    onUploadProgress: function (progressEvent) {
      onUploadProgress(progressEvent)
    },

    // `onDownloadProgress` allows handling of progress events for downloads
    // browser only
    
    onDownloadProgress: function (progressEvent) {
      onDownloadProgress(progressEvent)
    },

  })
    .then(function (response) {
      if (config.NODE_ENV !== "production") console.log("response:", response);
      cb(response)
    }).catch(function (error) {
      if (config.NODE_ENV !== "production") console.log("error:", error);
      let { response, message } = error;
      cb(response || { data: { error: true, msg: message || "Something went wrong!" } })
    }).then(function () {
      // will be called always.
    });
}

export default apiCall;