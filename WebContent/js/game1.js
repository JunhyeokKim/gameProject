var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = 50;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var scroll_x_start = 0;
var rightPressed = false;
var leftPressed = false;
var gameOver=false;
var horseStatus=0;

window.requestAnimationFrame = function() {

	return window.requestAnimationFrame ||

	window.webkitRequestAnimationFrame ||

	mozRequestAnimationFrame ||

	window.oRequestAnimationFrame ||

	window.msRequestAnimationFrame ||

	function (callback) {

	window.setTimeout(callback, 1000);

	}

	}();




var img=new Image();
var horses=[
	{number:1, pos:{x:0, y:canvas.height/2},source_size: {w:128, h:128},
	    target_size: {w:128, h:128}, sprite:{sprite_x:0,sprite_y:384}, dx:7, rank:1  },
	    {number:2, pos:{x:0, y:canvas.height/2+20},source_size: {w:128, h:128},
		    target_size: {w:128, h:128}, sprite:{sprite_x:0,sprite_y:384}, dx:7 ,rank:1 }
	    

]

img.src='img/horse-black.png';


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}
function mouseMoveHandler(e) {
	
}
function collisionDetection() {
	if(!gameOver)
	for(var idx=0; idx<horses.length; idx++){
		if(horses[idx].x>=canvas.width*0.8){
			alert(horses[idx].number+"踰� 留�");
			gameOver=true;
		}
	}
}

function drawHorse() {						// 留� 洹몃━湲�
	for(var idx=0; idx<horses.length ;idx++) {
		 ctx.beginPath();
		    ctx.drawImage(
		            img,
		            horses[idx].sprite.sprite_x,
		            horses[idx].sprite.sprite_y,
		            horses[idx].source_size.w,
		            horses[idx].source_size.h,
		            horses[idx].pos.x,
		            horses[idx].pos.y+32*idx,
		            horses[idx].target_size.w,
		            horses[idx].target_size.h
		        );
		    //console.log("x pos"+horses[idx].pos.x);
		    ctx.closePath();
		
	}
}
function drawPaddle() {
}
function drawBricks() {
}
function drawScore() {
}
function drawLives() {
}

function drawBackground(){
	ctx.beginPath();
	ctx.fillRect(0, 0, canvas.width, canvas.height/2);
	ctx.fillStyle='#207720';
	ctx.fill();
	ctx.closePath();
	ctx.beginPath();
	ctx.fillRect(0, canvas.height/2, canvas.width, canvas.height/2);
	ctx.fillStyle='#8d8bb3';
	ctx.fill();
	ctx.closePath();
}

function draw() {
	
	// canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // object drawing section
    drawBackground();
    drawBricks();
    drawHorse();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();
    // object position setting
    horseStatus=(horseStatus<3)?horseStatus+1:0;
    //console.log(horseStatus);
    var rank=new Array();
    for(var idx=0; idx<horses.length; idx++){
    rank.push(horses[idx].pos.x);
    }
    for(var idx=0; idx<horses.length; idx++){
    horses[idx].rank=rank[idx];
    horses[idx].dx+=Math.random();
    horses[idx].pos.x+=horses[idx].dx;
<<<<<<< HEAD
    if(horses[idx].pos.x>canvas.width || horses[idx].pos.x<0)
    	horses[idx].dx*=-1;
    horses[idx].sprite.sprite_x=(horses[idx].target_size.w*horseStatus);
    
=======
    if(horses[idx].pos.x>canvas.width)
    horses[idx].sprite.sprite_x=(32*horseStatus);
>>>>>>> origin/master
    
    }
    console.log(rank);
    // loop
    setTimeout(function() {
        requestAnimationFrame(draw);
      }, 1000 / 10);
}


draw();