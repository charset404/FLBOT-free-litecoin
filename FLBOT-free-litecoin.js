// ==UserScript==
// @name         FLBOT(free-litecoin) - Best and first bot for free-litecoin multiplier
// @namespace    http://free-litecoin.com/
// @version      0.3
// @description  [BETA] BETA VERSION OF FLBOT - AUTO MULTIPLY. INCREASE YOUR CHANCES!
// @author       Charset404, BrunoB
// @match        https://www.free-litecoin.com/multiply
// @grant        none
// ==/UserScript==

var stopp = true;
/**
* Configuração do FLBOT (Config of FLBOT)
* Atenção! Configure com cuidado. São 4 linhas configuraveis
* Por padrão o bot vem com uma configuração "segura",
* 50% de chance de perda/ganho, com valor setado minimo possível de aposta.
*/

var saveValue = 0.00000001;			// Quantidade de LTC a ser apostado. Formato: 0.00000000 (Amount of LTC to bet). Format: 0.00000000
var winChance = 50;					// Seta quantos % de ganho você tem de ganhar/perder (Arrow how many % gain you have to win/lose). Win chance, 1 and 95
var setLowHigh = 0;					// 0 = Jogar em Low | 1 = jogar em High. (0 = play Low | 1 = play High.)
var nunberOfRows = 300;				// Seta o numero de jogadas. (Set the number of rolls)

//==========================================================================================================================================================
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
  setTimeout(function() {   		//  call a 2s setTimeout when the loop is called.
	resultMoney();
	let getColor = document.getElementById("winlose").style.color;
	document.getElementById("winchance").value = winChance;

	var wins = document.getElementById("wins");
	var loss = document.getElementById("loss");

	if (getColor === "red" && stopp === false) {

		loss.innerHTML++
		changevalue(1);				// Multiplica 2x o valor da aposta se perder.
		bet(setLowHigh);
	}
	else if (getColor === "green" && stopp === false) {

		wins.innerHTML++
		saveValue = saveValue;		// Reseta a aposta para base, se ganhar.
		loadinput();
		bet(setLowHigh);
	}
	else if (getColor === "" && stopp === false) {
		bet(setLowHigh);
	}

	// ======================================================================

	i++;                    		//  increment the counter. Not edit
	if (i < nunberOfRows) { 		//  if the counter < 10, call the loop function.
	if (stopp == true) {
		return false;
	}
	  myLoop();            			//  ..  again which will trigger another.
	}                       		//  ..  setTimeout(). Not Edit
	}, 2000)                          // Time in ms. 2000 = 2s.
}

// New version.

function loadHTML() {

	var getHtml = document.querySelector(".paddingtop"); // Pega a string do conteúdo atual.
	var htmlTemp = getHtml.innerHTML;

	var inserthtml = `
        <div id="buttons">
	        <h1>FLBOT</h1>
	        <h1 id="subtext">Free-Litecoin BOT</h1>
	        <div id="infos">
	            <p id="ltcmoney"><span style="color: #cdcdcd">TOTAL LTC:</span> 0.00000000</p>
	            <p id="ltcwins"><span style="color: #cdcdcd">GANHOS:</span> <span id="wins">0</span></p>
	            <p id="ltcloss"><span style="color: #cdcdcd">PERDAS:</span> <span id="loss">0</span></p>
	            <p id="ltcstats"><span style="color: #cdcdcd">STATUS:</span> <span id="getstats">Configure ou de Start</p>
        </div>
	        <button id="bstart">Start FLBOT</button>
	        <button id="bstop">Stop FLBOT</button>
	        <p class="donate">Donate(Faça uma doação)</p>
	        <a href="https://github.com/Charset404/FLBOT-free-litecoin" class="donate">Source code: Charset404</a>
        </div>
`;

	htmlTemp = inserthtml + htmlTemp; // Concatena as strings colocando o novo html antes do htmlTemp

	// Coloca a nova string(que é o html) no DOM
	getHtml.innerHTML = htmlTemp;
}

function loadCSS() {
	/**
	 * Utility function to add CSS in multiple passes.
	 * @param {string} styleString
	 */
	function addStyle(styleString) {
		const style = document.createElement('style');
		style.textContent = styleString;
		document.head.append(style);
	}

	addStyle(`
		#buttons {
		  position: relative;
		  display: block;
		  width: 265px;
		  background-color: #161717;
		  margin: 20px auto 10px;
		  padding: 30px 0px;
		}

		#buttons h1 {
		  font-size: 25px;
		  text-align: center;
		  color: #007bff;
		}

		#buttons > #subtext {
		  font-size: 15px;
		  color: #cdcdcd;
		}

		#bstart, #bstop {
		  padding: 10px;
		  text-align: center;
		  font-size: 15px;
		  background-color: #1e7e34;
		  color: #fff;
		  border: none;
		}

		#bstop {
		  margin-left: 5px;
		  background-color: #bf0e0e;
		}

		#bstart:hover, #bstop:hover {
		  cursor: pointer;
		  border-bottom: 3px solid #ced4da;
		}


		/*CSS Infos*/
		#infos {
		  font-size: 14px;
		  color: #cdcdcd;
		  margin-top: 20px;
		}

		#infos > p {
		  margin-top: 20px;
		}

		/* css infos > p*/
		#ltcmoney {
		  color: #D6FF5C;
		}

		#ltcwins {
		  color: green;
		}

		#ltcloss {
		  color: red;
		}

		/*Donate*/

		.donate {
		  display: block;
		  margin-top: 10px;
		  text-decoration: none;
		  color: #cdcdcd;
		  text-align: center;
		  cursor: pointer;
		}

		.donate:hover {
		  color: #007bff;
		}
	`);
}

loadHTML();
loadCSS();

// Eventos importantes.
var bstart = document.getElementById("bstart");
var bstop = document.getElementById("bstop");
var popup = document.querySelector(".donate");

bstart.addEventListener ("click", function() {
    var showStats = document.getElementById("getstats"); // getStats
	start();
	saveValue = saveValue;
    showStats.innerText = "Farmando...";
});

bstop.addEventListener ("click", function() {
    var showStats = document.getElementById("getstats"); // getStats
	stop();
	saveValue = saveValue;
	loadinput();
    showStats.innerText = "Parado!";
});

function resultMoney() {
	var flMoney = document.getElementById("money");
	var getBotMoney = document.getElementById("ltcmoney");
	getBotMoney.innerText = flMoney.innerText; // Free-litecoin money show in FLBOT
}
resultMoney();

popup.addEventListener ("click", function(){
	alert("Contribua com nosso repositório no Github, ou faça uma doação simbolica para nós ajudar em futuros projetos e atualizações grátis.\n\n BTC: 168tx42M6zPEL9VA9ee3Yx7SmmYLMc9ajx\n LTC(min 0.001): LXsadeqAXBE7CzbSebxcgBfsmz8WBFGznz");
});