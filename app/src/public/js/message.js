import '../css/global.styl';
import '../css/demo.styl';

// create a hidden iframe
const iframe = document.createElement('iframe');
iframe.src = 'http://bar.com/demo/message-iframe';
iframe.style.width = 0;
iframe.style.height = 0;
document.body.appendChild(iframe);

iframe.onload = () => {
  function handleResponse(dataId, urlId, xhr) {
    const pre = document.getElementById(dataId);
    const response = xhr.responseText;
    const body = JSON.stringify(JSON.parse(response), null, 4);
    pre.textContent = body;
    const url = document.getElementById(urlId);
    url.textContent = xhr.responseURL;
  }

  // listen for messages posted from the iframe
  window.addEventListener('message', e => {
    const message = e.data;
    if(message.method === 'GET') {
      handleResponse('get-message-data', 'get-message-url', message.xhr);
    } else {
      handleResponse('post-message-data', 'post-message-url', message.xhr);
    }
  });

  // GET demo
  const getButton = document.getElementById('get-message-button');
  getButton.addEventListener('click', () => {
    const id = document.getElementById('get-message-id').value; 
    iframe.contentWindow.postMessage({
      method: 'GET',
      // see the same domain both iframe and AJAX url
      url: `http://bar.com/api/normal/${id}`
    }, 'http://bar.com');
  });

  // POST demo
  const postButton = document.getElementById('post-message-button');
  postButton.addEventListener('click', () => {
    const id = document.getElementById('post-message-id').value;
    //const url = 'http://bar.com/api/normal/';
    iframe.contentWindow.postMessage({
      method: 'POST',
      url: 'http://bar.com/api/normal/',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      data: JSON.stringify({
        id: id 
      })
    }, 'http://bar.com');
  });
};
