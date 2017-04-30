import '../css/global.styl';
import '../css/demo.styl';

let responseURL;

window.handleData = function handleData(data) {
  const pre = document.getElementById('get-jsonp-data');
  const text = JSON.stringify(data, null, 4);
  pre.textContent = text;
  const url = document.getElementById('get-jsonp-url');
  url.textContent = responseURL;
};

// GET demo
const getButton = document.getElementById('get-jsonp-button');
getButton.addEventListener('click', ()=>{
  const script = document.createElement('script');
  const id = document.getElementById('get-jsonp-id').value;
  script.src = `http://bar.com/api/jsonp/${id}?_cb=handleData`;
  responseURL = script.src;
  document.head.appendChild(script);
});
