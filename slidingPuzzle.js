"use strict";
var empX;
var empY;
var size;

window.addEventListener('load', function(){
	loadOnePiece ();
	document.getElementById('size33').addEventListener('click', function() {loadPuzzlePieces(3);});
	document.getElementById('size44').addEventListener('click', function() {loadPuzzlePieces(4);});
	document.getElementById('size55').addEventListener('click', function() {loadPuzzlePieces(5);});
	document.getElementById('size66').addEventListener('click', function() {loadPuzzlePieces(6);});
	document.getElementById('shuf').addEventListener('click', shufflePuzzlePieces);
});

function loadOnePiece() {
	var onePiece = document.createElement('div');
	onePiece.classList.add('puz');
	onePiece.style.position = 'absolute';
	onePiece.style.top = '0px';
	onePiece.style.left = '0px';
	onePiece.style.backgroundImage = 'url(elephant.jpg)';
	onePiece.id='onepiece';
	document.getElementById('puzzlearea').appendChild(onePiece);
}

function shufflePuzzlePieces () {
	document.getElementById('comp').innerHTML='<p></p>';
	for (var i=0; i<20; i++) {
		var neighbors = [[empX-1, empY], [empX+1, empY], [empX, empY-1], [empX, empY+1]];
		var shuf = Math.floor(Math.random()*4);
		var neighbor = neighbors[shuf];
		if ((neighbor[0]>=0) &&(neighbor[0]<=(size-1)) &&(neighbor[1] >=0) &&(neighbor[1]<=(size-1))) {
			changePosition(neighbor[0], neighbor[1]);
		};
	};
};

function changePosition (pX, pY) {
	var puz_shuf = 'puz_' + pX + '_' + pY;
	//console.log('The piece to be moved is ' + puz_shuf + ' empty space is ' + empX +' '+empY);
	var this_puz = document.getElementById(puz_shuf);
	this_puz.style.top = Math.floor(400*empY/size)+'px';
	this_puz.style.left = Math.floor(400*empX/size)+'px';
	this_puz.id = 'puz_' + empX + '_' + empY;
	empX = pX;
	empY = pY;
	//console.log('The new id is ' +this_puz.id + 'empty space is '+empX + ' '+ empY);
}

function loadPuzzlePieces (n) {
	document.getElementById('comp').innerHTML='<p></p>';
	size = n;
	empX = size -1;
	empY = size -1;
	var allPuz = document.querySelectorAll('.puz');
	for (i=0; i<allPuz.length; i++) {
		allPuz[i].parentNode.removeChild(allPuz[i]);
	};
	for (var i = 0; i < (n*n -1); i++) {
			var rect= document.createElement('div');
			rect.classList.add('puz');
			giveLocation(n, rect, i);
			document.getElementById('puzzlearea').appendChild(rect);
		};
};

function giveLocation(n, rect, i) {
		var xpos = i % n;
		var ypos = Math.floor(i/n);
		rect.id = 'puz_' + xpos + '_' + ypos;
		rect.style.position = 'absolute';
		rect.style.top = Math.floor(400*ypos/n) + 'px';
		rect.style.left = Math.floor(400*xpos/n) + 'PX';
		rect.style.height = Math.floor(400/n-6) + 'px';
		rect.style.width = Math.floor(400/n -6) + 'px';
		rect.style.border = 'solid black 3px';
		rect.style.backgroundImage = 'url(elephant.jpg)';
		rect.style.backgroundPosition = '-' + Math.floor(400*xpos/n) + 'px -' + Math.floor(400*ypos/n) + 'px';
		rect.addEventListener('click', switchPuz);
		
};

function switchPuz() {
	var pos=this.id.split("_");
	var xdiff = Math.abs(pos[1] - empX);
	var ydiff = Math.abs(pos[2] - empY);
	if (((xdiff === 1)||(ydiff === 1))&&((xdiff+ydiff) === 1)) {
		changePosition(pos[1], pos[2]);
	};
	checkCompletion ();
};

function checkCompletion() {
	var comp = 0;
	var allPuz=document.querySelectorAll('.puz');
	for (i=0; i<allPuz.length; i++) {
		var pos = allPuz[i].id.split("_");
		var posX=Math.floor(400*pos[1]/size);
		var posY=Math.floor(400*pos[2]/size);
		var img = allPuz[i].style.backgroundPosition.split(" ");
		var imgX=Math.abs(parseInt(img[0]));
		var imgY=Math.abs(parseInt(img[1]));
		//console.log(posX+' '+posY+' '+imgX+' '+imgY);
		if ((posX===imgX)&&(posY===imgY)) {
			comp++;
			//console.log('comp '+comp);
		}
	}
	if (comp === (size*size-1)) {
		console.log('congratulations');
		document.getElementById('comp').innerHTML='<p>Congratulation!</p>';
	}
}