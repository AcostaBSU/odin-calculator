function updateCurrOperand(chr) {
  if (Number(bottomDisplay.textContent) == 0) bottomDisplay.textContent = '';
  bottomDisplay.textContent += chr;
  currOperand = Number(bottomDisplay.textContent);
}

function consumeOperator(chr) {
  operator = chr;
  if (stagedOperand == null) {
    updateStaged();
    clearCurr();
  }
  else if (currOperand == null) {
    replaceStagedOperator();
  }
}

function updateStaged() {
  topDisplay.textContent = `${bottomDisplay.textContent} ${operator}`;
  stagedOperand = currOperand;
}

function replaceStagedOperator() {
  let strLength = topDisplay.textContent.length;
  topDisplay.textContent = `${topDisplay.textContent.slice(0, strLength - 1)} ${operator}`;
}

function clearCurr() {
  bottomDisplay.textContent = "0";
  currOperand = null;
}

const numpad = document.querySelector('.numpad-container');
const bottomDisplay = document.querySelector('.bottom-display');
const topDisplay = document.querySelector('.top-display')
let currOperand = null;
let stagedOperand = null;
let operator = '';

numpad.addEventListener('click', event => {
  let target = event.target;
  if (target.classList.contains('num') || target.classList.contains('dec')) updateCurrOperand(target.textContent);
  else if (target.classList.contains('operator')) {
    consumeOperator(target.textContent);
  }
});
