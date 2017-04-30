const DONE = 4;

window.addEventListener('message', e => {
  const message = e.data;

  // create an AJAX request for the message
  const xhr = new XMLHttpRequest();
  xhr.open(message.method, message.url, true);
  if(message.headers) {
    for(let header in message.headers) {
      xhr.setRequestHeader(header, message.headers[header]);
    }
  }

  // post the result to the source window
  xhr.onreadystatechange = () => {
    if(xhr.readyState === DONE) {
      e.source.postMessage({
        method: message.method,
        xhr: {
          responseText: xhr.responseText,
          responseURL: xhr.responseURL
        }
      }, e.origin);
    }
  };

  xhr.send(message.data);
});
