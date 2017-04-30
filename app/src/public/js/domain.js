import '../css/global.styl';
import '../css/demo.styl';

// The iframe and the page should be each of
// the two domains
const subdomain = 'baz.foo.com';
const basedomain = 'foo.com';

/*
FYI, the error come from the domain which is in one word, wihout dot.
If I change the domain from localhost to localhost.com, the Check page works on Chrome, Firefox and some other browsers
*/
const currentDomain = window.location.host;
let anotherDomain;

if(currentDomain === subdomain) {
  anotherDomain = basedomain;
} else {
  anotherDomain = subdomain;
}

// create a hidden iframe
const iframe = document.createElement('iframe');
// get iframe page
iframe.src = 'http://' + anotherDomain + '/demo/iframe';
iframe.style.width = 0;
iframe.style.height = 0;
document.body.appendChild(iframe);

iframe.onload = () => {
  // this is needed to make the internal port null
  document.domain = basedomain;

  // show the two domains
  document.getElementById('current-domain').textContent = currentDomain;
  document.getElementById('another-domain').textContent = anotherDomain;

  const DONE = 4; // XHR DONE readystate code

  function handleResponse(dataId, urlId, xhr) {
    const pre = document.getElementById(dataId);
    const response = xhr.responseText;
    const body = JSON.stringify(JSON.parse(response), null, 4);
    pre.textContent = body;
    const url = document.getElementById(urlId);
    url.textContent = xhr.responseURL;
  }

  // GET demo
  const getButton = document.getElementById('get-domain-button');
  getButton.addEventListener('click', () => {
    const id = document.getElementById('get-domain-id').value;
    const url = 'http://' + anotherDomain + '/api/normal/' + id;
    // AJAX from iframe
    const xhr = new iframe.contentWindow.XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = () => {
      if(xhr.readyState === DONE) {
        handleResponse('get-domain-data', 'get-domain-url', xhr);
      }
    };
    xhr.send();
  });


  // POST demo
  const postButton = document.getElementById('post-domain-button');
  postButton.addEventListener('click', () => {
    const id = document.getElementById('post-domain-id').value;
    const url = 'http://' + anotherDomain + '/api/normal';
    const xhr = new iframe.contentWindow.XMLHttpRequest();
    xhr.open('POST',url,true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.onreadystatechange = () => {
      if(xhr.readyState === DONE) {
        handleResponse('post-domain-data','post-domain-url', xhr);
      }
    };
    xhr.send(JSON.stringify({ id: id }));
  });
};
