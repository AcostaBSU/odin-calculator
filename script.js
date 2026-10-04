function updateCurrOperand(chr) {
  if (result = currOperand && stagedOperand != null) clearAll();
  if (!decimalUsed) updateIfZero();
  bottomDisplay.textContent += chr;
  currOperand = Number(bottomDisplay.textContent);
}

function addDecimalPoint() {
  if (result != null) clearAll();
  if (!decimalUsed) updateIfZero();

  if (!decimalUsed) {
    decimalUsed = true;
    bottomDisplay.textContent += '.';
    currOperand = Number(bottomDisplay.textContent);
  }
}

function applyNegative() {
  if (!(Number(bottomDisplay.textContent) == 0 || bottomDisplay.textContent == '.')) {
    if (bottomDisplay.textContent[0] == '-') {
      bottomDisplay.textContent = bottomDisplay.textContent.slice(1, bottomDisplay.textContent.length);
      currOperand = Math.abs(currOperand);
    }
    else {
      bottomDisplay.textContent = '-' + bottomDisplay.textContent;
      currOperand = -Math.abs(currOperand);
    }
  }
  if (result != null) {
    result = null;
    clearStaged();
  }
}

function updateIfZero () {
  if (Number(bottomDisplay.textContent) == 0) {
    bottomDisplay.textContent = '';
    decimalUsed = false;
  }
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
  topDisplay.textContent = `${stagedOperand} ${operator} ${currOperand}`;
  bottomDisplay.textContent = result;
  currOperand = result;
}

function updateStaged() {
  topDisplay.textContent = `${bottomDisplay.textContent} ${operator}`;
  stagedOperand = currOperand;
}

function replaceStagedOperator() {
  let strLength = topDisplay.textContent.length;
  topDisplay.textContent = `${topDisplay.textContent.slice(0, strLength - 1)} ${operator}`;
}

function clear() {
  if (result != null) clearAll();
  else if (currOperand != null) clearCurr();
  else clearAll();
}

function clearCurr() {
  bottomDisplay.textContent = '0';
  currOperand = null;
  decimalUsed = false;
}

function clearStaged() {
  topDisplay.textContent = '0';
  stagedOperand = null;
  operator = '';
}

function clearAll() {
  clearCurr();
  clearStaged();
  result = null;
}

function clearStaged() {
  topDisplay.textContent = '0';
  stagedOperand = null;
}

function saveResult() {
  bottomDisplay.textContent = result;
  currOperand = result;
  result = null;
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
const topDisplay = document.querySelector('.top-display');
let currOperand = null;
let stagedOperand = null;
let operator = '';
let result = null;
let decimalUsed = false;

numpad.addEventListener('click', event => {
  let target = event.target;
  if (target.classList.contains('num')) updateCurrOperand(target.textContent);
  else if (target.classList.contains('dec')) addDecimalPoint();
  else if (target.classList.contains('neg')) applyNegative();
  else if (target.classList.contains('operator')) consumeOperator(target.textContent);
  else if (target.classList.contains('equal')) consumeEqual();
  else if (target.classList.contains('clr')) clear();
});
