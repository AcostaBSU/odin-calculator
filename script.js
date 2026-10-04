function updateCurrOperand(chr) {
  if (Number(bottomDisplay.textContent) == 0) bottomDisplay.textContent = '';
  bottomDisplay.textContent += chr;
  currOperand = Number(bottomDisplay.textContent);
}

function consumeOperator(chr) {
  if (stagedOperand != null && currOperand != null) {
    eval();
    clearStaged();
    saveResult();
  }
  operator = chr;
  if (stagedOperand == null) {
    updateStaged();
    clearCurr();
  }
  else if (currOperand == null) {
    replaceStagedOperator();
  }
}

function consumeEqual() {
  eval()
  topDisplay.textContent = `${currOperand} ${operator} ${stagedOperand}`;
  bottomDisplay.textContent = result;
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
  bottomDisplay.textContent = '0';
  currOperand = null;
}

function clearStaged() {
  topDisplay.textContent = '0';
  stagedOperand = null;
}

function saveResult() {
  bottomDisplay.textContent = result;
  currOperand = result;
}

function eval() {
  if (operator == '+') {
    result = stagedOperand + currOperand;
  }
  if (operator == '-') {
    result = stagedOperand - currOperand;
  }
  if (operator == 'x') {
    result = stagedOperand * currOperand;
  }
  if (operator == '/') {
    result = stagedOperand / currOperand;
  }
  console.log(result);
}

const numpad = document.querySelector('.numpad-container');
const bottomDisplay = document.querySelector('.bottom-display');
const topDisplay = document.querySelector('.top-display')
let currOperand = null;
let stagedOperand = null;
let operator = '';
let result = null;

numpad.addEventListener('click', event => {
  let target = event.target;
  if (target.classList.contains('num') || target.classList.contains('dec')) updateCurrOperand(target.textContent);
  else if (target.classList.contains('operator')) {
    consumeOperator(target.textContent);
  }
  else if (target.classList.contains('equal')) {
    consumeEqual(target.textContent);
  }
});
