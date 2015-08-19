"use strict";
var count=0;
var tie=1;
var comp = 1;
var check=['.lane_0', '.lane_1', '.lane_2', '.column_0', '.column_1', '.column_2', '.cross_1', '.cross_2'];
//3 x 3 arr to track marks on the pieces. 10 is background, 1 is player's mark, 0 is computer's mark
var arr=[[10, 10, 10], [10, 10, 10], [10, 10, 10]];
var emp = 'url(beach_s.jpg)';
var x = 'url(x.jpg)';
var o = 'url(o.jpg)';

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
	arr=[[10, 10, 10], [10, 10, 10], [10, 10, 10]];
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
	var choice = 1;
	var pos = this.id.split("_");
	if ((arr[pos[1]][pos[2]] === 10) && (comp === 1)) {
		count=count+1;
		this.style.backgroundImage = x;
		this.style.backgroundPosition = '0px 0px';
		arr[pos[1]][pos[2]] = 1;
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
			var pos0 = all[0].id.split("_");
			var pos1 = all[1].id.split("_");
			var pos2 = all[2].id.split("_");			
			if ((arr[pos0[1]][pos0[2]]===1)&&(arr[pos1[1]][pos1[2]]===1)&&(arr[pos2[1]][pos2[2]]===1)) {
				document.getElementById('comp').innerHTML='<p>Congratulation, you win!</p>';
				tie=0;
				stopGame();
			}
			if ((arr[pos0[1]][pos0[2]]===0)&&(arr[pos1[1]][pos1[2]]===0)&&(arr[pos2[1]][pos2[2]]===0)) {
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
	var choice = 1;
	for (var i=0; i<check.length; i++) {
		var all = document.querySelectorAll(check[i]);
		var pos0 = all[0].id.split("_");
		var pos1 = all[1].id.split("_");
		var pos2 = all[2].id.split("_");			
		
		if (choice === 1) {
		if ((arr[pos0[1]][pos0[2]]===0)&&(arr[pos1[1]][pos1[2]]===0)&&(arr[pos2[1]][pos2[2]]===10)) {
			all[2].style.backgroundImage = o;
			all[2].style.backgroundPosition = '0px 0px';
			arr[pos2[1]][pos2[2]]=0;
			choice = 0;
		} else if ((arr[pos0[1]][pos0[2]]===0)&&(arr[pos2[1]][pos2[2]]===0)&&(arr[pos1[1]][pos1[2]]===10)) {
			all[1].style.backgroundImage = o;
			all[1].style.backgroundPosition = '0px 0px';
			arr[pos1[1]][pos1[2]]=0;
			choice = 0;
		} else if ((arr[pos1[1]][pos1[2]]===0)&&(arr[pos2[1]][pos2[2]]===0)&&(arr[pos0[1]][pos0[2]]===10)) {
			all[0].style.backgroundImage = o;
			all[0].style.backgroundPosition = '0px 0px';
			arr[pos0[1]][pos0[2]]=0;
			choice = 0;
		}
		}
	}
	for (var i=0; i<check.length; i++) {
		var all = document.querySelectorAll(check[i]);
		var pos0 = all[0].id.split("_");
		var pos1 = all[1].id.split("_");
		var pos2 = all[2].id.split("_");			

		if (choice === 1) {
		if ((arr[pos0[1]][pos0[2]]===1)&&(arr[pos1[1]][pos1[2]]===1)&&(arr[pos2[1]][pos2[2]]===10)) {
			all[2].style.backgroundImage = o;
			all[2].backgroundPosition = '0px 0px';
			arr[pos2[1]][pos2[2]]=0;
			choice = 0;
		} else if ((arr[pos0[1]][pos0[2]]===1)&&(arr[pos2[1]][pos2[2]]===1)&&(arr[pos1[1]][pos1[2]]===10)) {
			all[1].style.backgroundImage = o;
			all[1].style.backgroundPosition = '0px 0px';
			arr[pos1[1]][pos1[2]]=0;
			choice = 0;
		} else if ((arr[pos1[1]][pos1[2]]===1)&&(arr[pos2[1]][pos2[2]]===1)&&(arr[pos0[1]][pos0[2]]===10)) {
			all[0].style.backgroundImage = o;
			all[0].style.backgroundPosition = '0px 0px';
			arr[pos0[1]][pos0[2]]=0;
			choice = 0;
		}
		}
	}
	while (choice === 1) {
		var a = Math.floor(Math.random()*3);
		var b = Math.floor(Math.random()*3);
		var ran = document.getElementById('puz_'+a+'_'+b);
		if (arr[a][b] === 10) {
			ran.style.backgroundImage = o;
			ran.style.backgroundPosition = '0px 0px';
			arr[a][b] = 0;
			choice = 0;
		}
	}
};

function stopGame() {
	comp = 0;
}
