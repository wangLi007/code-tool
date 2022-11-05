import axios from 'axios';
// 工程化 axios配置

/**
 * // error-400
  error: {
    config: {…}, // config 对象具体属性见：https://github.com/axios/axios#request-confi
    request: XMLHttpRequest {…}, // 一个 XMLHttpRequest 对象
    response: {
      config: {…},
      data: null,
      headers: {…},
      request: XMLHttpRequest {…},
      status: 400, // HTTP status code
      statusText: "Bad Request", // HTTP status message
    }
    message: "Request failed with status code 400",
    stack: "Error: Request failed with status code 400",
  }
  // error-500
  error: {
    config: {…},
    request: XMLHttpRequest {…}, // 一个 XMLHttpRequest 对象
    response: {
      config: {…},
      data: null,
      headers: {…},
      request: XMLHttpRequest {…},
      status: 500, // HTTP status code
      statusText: "Internal Server Error", // HTTP status message
    }
    message: "Request failed with status code 500",
    stack: "Error: Request failed with status code 500",
  }
  // network-error
  error: {
    config: {…},
    request: XMLHttpRequest {…}, // 一个 XMLHttpRequest 对象
    response: undefined,
    message: "Network Error",
    stack: "Error: Network Error",
  }
  // cancel-error
  error: {
    message: "Operation canceled by the user."
  }
  // response-200
  response: {
    config: {…},
    data: {…}, // 里面是后台自定义的数据结构，例如：{ code, msg, result }
    headers: {…},
    request: XMLHttpRequest {…},
    status: 200, // HTTP status code
    statusText: "OK", // HTTP status message
  }
 */

const request = axios.create({
  baseURL: 'http://119.23.152.30/', // url = base url + request url
  timeout: 30000,
});

request.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// interface Iresponse {
//   data: any,
//   code: number
// }

// response interceptor
request.interceptors.response.use(
  (response) => {
    // 1. http 状态码是 2xx 会进来这里，response 的数据结构如下：response-200
    // 2. 可通过 validateStatus 配置进到 success callback 的 http status，例如:
    //    function (status) {
    //      return status >= 200 && status <= 500; // 当 http status 属于定义的范围内，都会进到 success callback
    //    }

    // const res = response.data;
    return response.data;
  },
  (error) => {
    // 1. http 状态码非2开头（没有额外定义 validateStatus）的都会进来这里，如 404, 500 等，error 的数据结构如下：error-400、error-500
    // 2. 取消请求也会进入这里，可以用 axios.isCancel(error) 来判断是否是取消请求，error 的数据结构如下：cancel-error
    // 3. 请求运行有异常也会进入这里，如故意将 headers 写错：axios.defaults.headers = '123'
    // 4. 断网，error 的数据结构如下：network-error

    if (error.response) {
      // 请求已发出，服务器返回的 http 状态码不是 2xx，例如：400，500，对应上面的 1
      console.info(error.response);
    } else if (error.request) {
      // 请求已发出，但没有收到响应，例如：断网，对应上面的 4
      console.info(error.request);
    } else {
      // 请求被取消或者发送请求时异常，对应上面的 2 & 3
      console.info('error', error.message);
    }

    return Promise.reject(error);
  }
);

export default request;
