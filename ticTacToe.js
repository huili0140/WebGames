"use strict";
var count=0;
var tie=1;
var comp = 1;
var check=['.lane_0', '.lane_1', '.lane_2', '.column_0', '.column_1', '.column_2', '.cross_1', '.cross_2']; 
var emp = 'url("beach_s.jpg")';
var x = 'url("x.jpg")';
var o = 'url("o.jpg")';

window.addEventListener('load', function () {
	loadOnePiece ();
	document.getElementById('gamestart').addEventListener('click', loadPieces);
});

function loadOnePiece() {
	var onePiece = document.createElement('div');
	onePiece.classList.add('puz');
	onePiece.style.position = 'absolute';
	onePiece.style.top = '0px';
	onePiece.style.left = '0px';
	onePiece.style.backgroundImage = emp;
	onePiece.id='onepiece';
	document.getElementById('puzzlearea').appendChild(onePiece);
}

function loadPieces () {
	count =0;
	tie =1;
	comp =1;
	document.getElementById('comp').innerHTML='<p></p>';
	var allPuz = document.querySelectorAll('.puz');
	for (var i=0; i<allPuz.length; i++) {
		allPuz[i].parentNode.removeChild(allPuz[i]);
	};
	for (var i = 0; i < 9; i++) {
			var rect= document.createElement('div');
			rect.classList.add('puz');
			giveLocation(rect, i);
			document.getElementById('puzzlearea').appendChild(rect);
		};
};

function giveLocation(rect, i) {
		var xpos = i % 3;
		var ypos = Math.floor(i/3);
		
		rect.classList.add('lane_'+xpos);
		rect.classList.add('column_'+ypos);
		if (xpos === ypos) {
			rect.classList.add('cross_1');
		}
		if ((xpos+ypos) === 2) {
			rect.classList.add('cross_2');
		}

		rect.id = 'puz_' + xpos + '_' + ypos;
		rect.style.position = 'absolute';
		rect.style.top = Math.floor(100*ypos) + 'px';
		rect.style.left = Math.floor(100*xpos) + 'PX';
		rect.style.height = Math.floor(100-1) + 'px';
		rect.style.width = Math.floor(100-1) + 'px';
		rect.style.border = 'solid black 1px';
		rect.style.backgroundImage = emp;
		rect.style.backgroundPosition = '-' + Math.floor(100*xpos) + 'px -' + Math.floor(100*ypos) + 'px';
		rect.addEventListener('click', gamePlayerChoice);
		
};

function gamePlayerChoice() {
	//console.log("game player choice...");
	var choice = 1;
	if ((this.style.backgroundImage === emp)&&(comp === 1)) {
		count=count+1;
		this.style.backgroundImage=x;
		this.style.backgroundPosition = '0px 0px';
		choice = 0;
		checkCompletion();
	}
	if ((count < 9)&&(choice === 0)&&(comp === 1) ) {
		computerChoice();
		count=count+1;
		checkCompletion();
	}
};

function checkCompletion() {
	for (var i=0; i<check.length; i++) {
			var all = document.querySelectorAll(check[i]);
			//console.log(all[0].style.backgroundImage);
			if ((all[0].style.backgroundImage===x)&&(all[1].style.backgroundImage===x)&&(all[2].style.backgroundImage===x)) {
				document.getElementById('comp').innerHTML='<p>Congratulation, you win!</p>';
				tie=0;
				stopGame();
			}
			if ((all[0].style.backgroundImage===o)&&(all[1].style.backgroundImage===o)&&(all[2].style.backgroundImage===o)) {
				document.getElementById('comp').innerHTML='<p>Oops, you lose!</p>';
				tie=0;
				stopGame();
			}
		
	}
	if ((count === 9)&&(tie === 1)) {
		document.getElementById('comp').innerHTML='<p>OK, we tie!</p>';
		stopGame();
	}
};

function computerChoice() {
	console.log("computer choice...");
	var choice = 1;
	for (var i=0; i<check.length; i++) {
		var all = document.querySelectorAll(check[i]);
		if (choice === 1) {
		if ((all[0].style.backgroundImage===o)&&(all[1].style.backgroundImage ===o)&&(all[2].style.backgroundImage === emp)) {
			all[2].style.backgroundImage = o;
			choice = 0;
		} else if ((all[0].style.backgroundImage===o)&&(all[2].style.backgroundImage===o)&&(all[1].style.backgroundImage === emp)) {
			all[1].style.backgroundImage = o;
			choice = 0;
		} else if ((all[1].style.backgroundImage ===o)&&(all[2].style.backgroundImage===o)&&(all[0].style.backgroundImage === emp)) {
			all[0].style.backgroundImage =o;
			choice = 0;
		}
		}
	}
	for (var i=0; i<check.length; i++) {
		var all = document.querySelectorAll(check[i]);
		if (choice === 1) {
		if ((all[0].style.backgroundImage===x)&&(all[1].style.backgroundImage===x)&&(all[2].style.backgroundImage===emp)) {
			all[2].style.backgroundImage = o;
			choice = 0;
		} else if ((all[0].style.backgroundImage===x)&&(all[2].style.backgroundImage===x)&&(all[1].style.backgroundImage=== emp)) {
			all[1].style.backgroundImage = o;
			choice = 0;
		} else if ((all[1].style.backgroundImage===x)&&(all[2].style.backgroundImage===x)&&(all[0].style.backgroundImage=== emp)) {
			all[0].style.backgroundImage = o
			choice = 0;
		}
		}
	}
	while (choice === 1) {
		var a = Math.floor(Math.random()*3);
		var b = Math.floor(Math.random()*3);
		var ran = document.getElementById('puz_'+a+'_'+b);
		if ((ran.style.backgroundImage !== 'url("x.jpg")')&&(ran.style.backgroundImage !== 'url("o.jpg")')) {
			ran.style.backgroundImage = 'url(o.jpg)';
			choice = 0;
		}
		
	}
};

function stopGame() {
	comp = 0;
}
