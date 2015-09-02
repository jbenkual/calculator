var total = 0; // Total Value
var cur = 0; // Current Input
var mode = "N"; 
var modeFunc;
var buttons = [];
var decCount = 0;
/*
O = Overwrite
N = Number (Append)
A = Add
S = Subtract
M = Multiply
D = Divide
*/

var Button = function (id, val, newMode, exec, clickFunc) {
	// properties
	this.val = val;
	this.id = id;
	this.bMode = newMode;
	this.clickFunc = clickFunc;
	this.handleClick = function (e) {
		if(exec) {
			clickFunc(val, modeFunc);
		}
		else {
			modeFunc = clickFunc;
			if(mode != 'O') {
				total = cur;
				cur = 0;
			}
		}
		mode = newMode;
		updateScreen();
	}

	// methods
	$("#" + this.id).click(this.handleClick);
}

function inverseSign(num1) {
	total *= -1;
}

function add(num1, num2) {
	return num1 + num2;
}

function multiply(num1, num2) {
	return num1*num2;
}

function divide(num1, num2) {
	return num1/num2;
}

function subtract(num1, num2) {
	return num1-num2;
}

function equals(val, func) {
	if(typeof(func) === 'undefined') {
		total = cur;
		cur = 0;
	}
	else {
		evaluate(val, func)
	}
}

function clearScreen() {
	if(mode == "O") {
		total = 0;
	}
	else {
		cur = 0;
	}
}

function evaluate(val, func) {
	total = func(total, cur);
	cur = 0;
}

function numb(value) {
	if(mode == 'O') {
		cur = value;
	}
	else {
		cur = cur * 10 + parseInt(value);
	}
}

function dec(value) {
	decCount++;
	cur = cur + (parseInt(value) * Math.pow(10,decCount));
}

function updateScreen() {
	if(mode == "O"){
		$("#screen").val(total);
	}
	else if(mode == "N") {
		$("#screen").val(cur);
	}
	else {
		$("#screen").val(total);
	}
}

buttons.push(new Button("plus", "+", "A", false, add));
buttons.push(new Button("minus", "-", "S", false, subtract));
buttons.push(new Button("mult", "x", "M", false, multiply));
buttons.push(new Button("divide", "&divide;", "D", false, divide));
buttons.push(new Button("plusmn", "&plusmn;", "O", true, inverseSign));
buttons.push(new Button("clear", "C", "O", true, clearScreen));
buttons.push(new Button("equals", "=;", "O", true, equals));
for(var i = 0; i < 10; i++) {
	buttons.push(new Button(i.toString(), i.toString(), "N", "true", numb));
}