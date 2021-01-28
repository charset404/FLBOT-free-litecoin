// ==UserScript==
// @name         FLBOT(free-litecoin) - Best and first bot for free-litecoin multiplier
// @namespace    http://free-litecoin.com/
// @version      0.2
// @description  [BETA] BETA VERSION OF FLBOT - AUTO MULTIPLY. INCREASE YOUR CHANCES!
// @author       Charset404, BrunoB
// @match        https://www.free-litecoin.com/multiply
// @grant        none
// ==/UserScript==

var stopp = true;
// Configurações do BOT(config BOT) //

var savevalue = 0.00000001;			// Quantidade de LTC a ser apostado (Amount of LTC to bet).
var winChance = 50;					// Seta quantos % de ganho você tem de ganhar/perder (Arrow how many % gain you have to win/lose).
var setLowHigh = 0;					// 0 = Jogar em Low | 1 = jogar em High. (0 = play Low | 1 = play High.)
var nunberOfRows = 300;				// Seta o numero de jogadas. (Set the number of rolls)

// Não edite abaixo sem conhecimento. (Do not edit below without knowledge)
loadinput();

var i = 0;                  		//  set your counter to 1, not edit it
function start() {
	stopp = false;
	myLoop();
}

function stop() {
	stopp = true;
	myLoop();
}

function myLoop() {         		//  create a loop function. Not edit

  setTimeout(function() {   		//  call a 2s setTimeout when the loop is called. Not edit

	// ======================================================================

	let getColor = document.getElementById("winlose").style.color;
	document.getElementById("winchance").value = winChance;


	if (getColor === "red" && stopp === false) {

		changevalue(1);				// Multiplica 2x o valor da aposta se perder. not Edit
		bet(setLowHigh);
	}
	else if (getColor === "green" && stopp === false) {

		savevalue = 0.00000001;		// Reseta a aposta para base, se ganhar. Not Edit
		loadinput();
		bet(setLowHigh);
	}
	else if (getColor === "" && stopp === false) {
		bet(setLowHigh);
	}

	// ======================================================================

    i++;                    		//  increment the counter. Not edit
    if (i < nunberOfRows) { 		//  if the counter < 10, call the loop function. Not Edit
	if (stopp == true) {
		return false;
	}
      myLoop();            			//  ..  again which will trigger another. Not Edit
    }                       		//  ..  setTimeout(). Not Edit
  }, 2000)                          // Time in ms. 2000 = 2s. Not Edit
}


function createStart(){
  // 1. Create the button
  var button = document.createElement("button");
  button.innerHTML = "START BOT";

  // 2. Append somewhere
  var body = document.getElementsByTagName("body")[0];
  body.appendChild(button);

  // 3. Add event handler
  button.addEventListener ("click", function() {
    start();
  });
}

function createStop(){
  // 1. Create the button
  var button = document.createElement("button");
  button.innerHTML = "STOP BOT";

  // 2. Append somewhere
  var body = document.getElementsByTagName("body")[0];
  body.appendChild(button);

  // 3. Add event handler
  button.addEventListener ("click", function() {
    stop();
    var savevalue = 0.00000001;
    loadinput();
  });
}

createStart();
createStop();
