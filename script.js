var display = document.getElementById("display")
var btns = document.getElementsByClassName("btn")

display.textContent = ""
let isResultDisplayed = false;

for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("mousedown", function() {
        this.style.backgroundImage = "linear-gradient(gray, red)";
    });
    btns[i].addEventListener("mouseup", function() {
        this.style.backgroundImage = "";
    });
}

function pressed(num){
    if (isResultDisplayed) {
        display.textContent = num;
        isResultDisplayed = false;
    } else {
        display.textContent += num;
    }
}

function clearAll(){
    display.textContent = ""
}

function backspace(){
    display.textContent = display.textContent.slice(0, -1)
}

const keyToButton = {
    'c': 0, 'C': 0,
    'Backspace': 1,
    '/': 2, 'NumpadDivide': 2,
    '7': 3, 'Numpad7': 3,
    '8': 4, 'Numpad8': 4,
    '9': 5, 'Numpad9': 5,
    '*': 6, 'NumpadMultiply': 6,
    '4': 7, 'Numpad4': 7,
    '5': 8, 'Numpad5': 8,
    '6': 9, 'Numpad6': 9,
    '+': 10, 'NumpadAdd': 10,
    '1': 11, 'Numpad1': 11,
    '2': 12, 'Numpad2': 12,
    '3': 13, 'Numpad3': 13,
    '-': 14, 'NumpadSubtract': 14,
    '0': 15, 'Numpad0': 15,
    '.': 16, 'NumpadDecimal': 16,
    '=': 17, 'Enter': 17, 'NumpadEnter': 17
};;

document.addEventListener('keydown', function(e) {
    const key = e.key;
    const index = keyToButton[key]; 
    const keyActionMap = {
        'Numpad0': '0',
        'Numpad1': '1',
        'Numpad2': '2',
        'Numpad3': '3',
        'Numpad4': '4',
        'Numpad5': '5',
        'Numpad6': '6',
        'Numpad7': '7',
        'Numpad8': '8',
        'Numpad9': '9',
        'NumpadAdd': '+',
        'NumpadSubtract': '-',
        'NumpadMultiply': '*',
        'NumpadDivide': '/',
        'NumpadDecimal': '.'
    };

    if (index !== undefined) {
        btns[index].style.backgroundImage = "linear-gradient(gray, red)";

        if (keyActionMap[key]) {
            pressed(keyActionMap[key]);
        } else if (key >= '0' && key <= '9' || key === '.' || key === '+' || key === '-' || key === '*' || key === '/') {
            pressed(key);
        } else if (key === '=' || key === 'Enter' || key === 'NumpadEnter') {
            calculate();
        } else if (key === 'c' || key === 'C') {
            clearAll();
        } else if (key === 'Backspace') {
            backspace();
        }
    }
});

document.addEventListener('keyup', function(e) {
    const index = keyToButton[e.key];
    if (index !== undefined) {
        btns[index].style.backgroundImage = "";
    }
});

function calculate(){
    try {
        display.textContent = eval(display.textContent);
        isResultDisplayed = true;
    } catch (error) {
        display.textContent = "Error";
        isResultDisplayed = true;
    }
}
