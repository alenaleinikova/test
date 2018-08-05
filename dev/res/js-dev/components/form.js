import nanoajax from 'nanoajax';

let form;

function findElements() {
  form = document.querySelector('.feedback');
}

function sendData() {
  const data = new FormData(form);
  return new Promise((resolve, reject) => {
    nanoajax.ajax({
      url: form.action,
      body: data,
      method: 'POST',
    }, (code) => {
      if (code === 200) resolve();
      else reject(new Error(code));
    });
  });
}

function resetFormStatus() {
  form.className = 'feedback';
}

function onClick() {
  document.removeEventListener('click', onClick);
  resetFormStatus();
}

function onTouch() {
  document.removeEventListener('touchstart', onTouch);
  resetFormStatus();
}


function showSuccess() {
  form.reset();
  form.classList.add('feedback-is-send');
  document.addEventListener('click', onClick);
  document.addEventListener('touchstart', onTouch);
}

function showError() {
  form.classList.add('feedback-is-failed');
  document.addEventListener('click', onClick);
  document.addEventListener('touchstart', onTouch);
}


function sendForm() {
  sendData()
    .then(showSuccess)
    .catch(showError);
}

function onSubmit(event) {
  event.preventDefault();
  sendForm();
}

function subscribe() {
  form.addEventListener('submit', onSubmit);
}

export function init() {
  findElements();
  subscribe();
}