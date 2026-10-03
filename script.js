const numpad = document.querySelector('.numpad-container');

numpad.addEventListener('click', event => {
  console.log(event);
  console.log(event.target.textContent);
});
