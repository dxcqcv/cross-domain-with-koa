import '../css/global.styl';
import '../css/demo.styl';

const DONE = 4; // XHR DONE readystate code

function handleResponse(dataId, urlId, xhr) {
  let pre = document.getElementById(dataId);
  console.log(1212);
  console.log(xhr.responseText);
  const response = xhr.responseText;
  const body = JSON.stringify(JSON.parse(response), null, 4);
  pre.textContent = body;
  const url = document.getElementById(urlId);
  url.textContent = xhr.responseURL;
}

function createCORSRequest(method, url) {
  let xhr = new XMLHttpRequest();
  if('withCredentials' in xhr) {
    // Check if the XMLHttpRequest object has a 'withCredentials' property
    // 'withCredentials' only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);
  } else if(typeof XDomainRequest != 'undefined') {
    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // Otherwise, CORS is not supported by the browser
    xhr = null;
  }
  return xhr;
}

// GET demo
const getButton = document.getElementById('get-cors-button');
getButton.addEventListener('click', () => {
  const id = document.getElementById('get-cors-id').value; 
  const url = `http://bar.com/api/cors/${id}`;
  const xhr = createCORSRequest('GET', url);
  xhr.onreadystatechange = () => {
    if(xhr.readyState === DONE) {
      handleResponse('get-cors-data', 'get-cors-url', xhr);
    }
  };
  xhr.send();
});

// POST demo
const postButton = document.getElementById('post-cors-button');
postButton.addEventListener('click', () => {
  const id = document.getElementById('post-cors-id').value;
  const url = `http://bar.com/api/cors/`;
  const xhr = createCORSRequest('POST',url);

  const preflight = document.getElementById('post-cors-preflight').checked;
  if(preflight) {
    // this line would make the request preflight
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  } else {
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
  }

  xhr.onreadystatechange = () => {
    if(xhr.readyState === DONE) {
      handleResponse('post-cors-data', 'post-cors-url', xhr);
    }
  };

  if(preflight) {
    xhr.send(JSON.stringify({id: id}));
  } else {
    xhr.send(`id=${id}`); // url-encoded
  }
});
