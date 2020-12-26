import moment from "moment";
import queryString from 'querystring';
import axios from 'axios';
import Q from 'q';
import configs from './config';

export function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }, wait);
    if (immediate && !timeout) func.apply(context, args);
  };
}

export function isMobile() {
  if (window) {
    return window.matchMedia(`(max-width: 767px)`).matches;
  }
  return false;
}

export function isMdScreen() {
  if (window) {
    return window.matchMedia(`(max-width: 1199px)`).matches;
  }
  return false;
}

function currentYPosition() {
  if (!window) {
    return;
  }
  // Firefox, Chrome, Opera, Safari
  if (window.pageYOffset) return window.pageYOffset;
  // Internet Explorer 6 - standards mode
  if (document.documentElement && document.documentElement.scrollTop)
    return document.documentElement.scrollTop;
  // Internet Explorer 6, 7 and 8
  if (document.body.scrollTop) return document.body.scrollTop;
  return 0;
}

function elmYPosition(elm) {
  var y = elm.offsetTop;
  var node = elm;
  while (node.offsetParent && node.offsetParent !== document.body) {
    node = node.offsetParent;
    y += node.offsetTop;
  }
  return y;
}

export function scrollTo(scrollableElement, elmID) {
  var elm = document.getElementById(elmID);
  if (!elmID || !elm) {
    return;
  }
  var startY = currentYPosition();
  var stopY = elmYPosition(elm);
  var distance = stopY > startY ? stopY - startY : startY - stopY;
  if (distance < 100) {
    scrollTo(0, stopY);
    return;
  }
  var speed = Math.round(distance / 50);
  if (speed >= 20) speed = 20;
  var step = Math.round(distance / 25);
  var leapY = stopY > startY ? startY + step : startY - step;
  var timer = 0;
  if (stopY > startY) {
    for (var i = startY; i < stopY; i += step) {
      setTimeout(
        (function(leapY) {
          return () => {
            scrollableElement.scrollTo(0, leapY);
          };
        })(leapY),
        timer * speed
      );
      leapY += step;
      if (leapY > stopY) leapY = stopY;
      timer++;
    }
    return;
  }
  for (let i = startY; i > stopY; i -= step) {
    setTimeout(
      (function(leapY) {
        return () => {
          scrollableElement.scrollTo(0, leapY);
        };
      })(leapY),
      timer * speed
    );
    leapY -= step;
    if (leapY < stopY) leapY = stopY;
    timer++;
  }
  return false;
}

export function getTimeDifference(date) {
  let difference =
    moment(new Date(), "DD/MM/YYYY HH:mm:ss").diff(
      moment(date, "DD/MM/YYYY HH:mm:ss")
    ) / 1000;

  if (difference < 60) return `${Math.floor(difference)} seconds`;
  else if (difference < 3600) return `${Math.floor(difference / 60)} minutes`;
  else if (difference < 86400) return `${Math.floor(difference / 3660)} hours`;
  else if (difference < 86400 * 30)
    return `${Math.floor(difference / 86400)} days`;
  else if (difference < 86400 * 30 * 12)
    return `${Math.floor(difference / 86400 / 30)} months`;
  else return `${(difference / 86400 / 30 / 12).toFixed(1)} years`;
}

export function generateRandomId() {
  let tempId = Math.random().toString();
  let uid = tempId.substr(2, tempId.length - 1);
  return uid;
}

export function getQueryParam(prop) {
  var params = {};
  var search = decodeURIComponent(
    window.location.href.slice(window.location.href.indexOf("?") + 1)
  );
  var definitions = search.split("&");
  definitions.forEach(function(val, key) {
    var parts = val.split("=", 2);
    params[parts[0]] = parts[1];
  });
  return prop && prop in params ? params[prop] : params;
}

export function classList(classes) {
  return Object.entries(classes)
    .filter(entry => entry[1])
    .map(entry => entry[0])
    .join(" ");
}

export async function makeHttpRequest(methodOriginal, urlOriginal, data, customHeaders) {
  var deferred = Q.defer();

  const method = methodOriginal.toLowerCase();
  let url = configs.BACKEND_CLIENT_URL + urlOriginal;
  let config = {
    method: method,
    url: url,
    withCredentials: true,
  };

  if (data) {
    const paramsTxt = queryString.stringify(data);
    if (method === 'get' || method === 'delete')
      config['url'] = url + '?' + paramsTxt;
    else if (method === 'post' || method === 'put')
      config['data'] = data;
  }

  let headers = customHeaders;
  config['headers'] = headers;

  try {
    let retReq = await axios(config);
    if (Array.isArray(retReq.data) || (''+retReq.status).startsWith('2'))
      deferred.resolve(retReq.data);
    else
      deferred.reject(retReq.data);
  } catch (err) {
    deferred.reject(err);
  }

  return deferred.promise;
}

export function makeJsonRequest(methodOriginal, urlOriginal, data, customHeaders) {
  let headers = { 'Content-type': 'application/json', 'Accept': 'application/json' };
  if (customHeaders) {
    for (let cusHead in customHeaders) {
      headers[cusHead] = customHeaders[cusHead];
    }
  }
  return makeHttpRequest(methodOriginal, urlOriginal, data, headers);
}

export function makeMultipartRequest(methodOriginal, urlOriginal, formData, customHeaders) {
  let headers = { 'Content-type': 'multipart/form-data'};
  // let headers = {};
  if (customHeaders) {
    for (var cusHead in customHeaders) {
      headers[cusHead] = customHeaders[cusHead];
    }
  }
  return makeHttpRequest(methodOriginal, urlOriginal, formData, headers);
}

// CRUD JSON
export function getJson(path, data, headers) {
  return makeJsonRequest('GET', path, data, headers);
}

export function postJson(path, data, headers) {
  return makeJsonRequest('POST', path, data, headers);
}

export function putJson(path, data, headers) {
  return makeJsonRequest('PUT', path, data, headers);
}

export function deleteJson(path, data, headers) {
  return makeJsonRequest('DELETE', path, data, headers);
}

export function postMultipartForm(path, data, headers) {
  return makeMultipartRequest('POST', path, data, headers)
}
