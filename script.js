function updateCurrOperand(chr) {
  if (Number(currOperand.textContent) == 0) currOperand.textContent = "";
  currOperand.textContent += chr;
}

const numpad = document.querySelector('.numpad-container');
const currOperand = document.querySelector(".bottom-display");


numpad.addEventListener('click', event => {
  let target = event.target;
  if (target.classList.contains("num") || target.classList.contains("dec")) updateCurrOperand(target.textContent);
});
