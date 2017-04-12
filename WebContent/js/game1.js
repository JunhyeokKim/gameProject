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
	{number:1, pos:{x:0, y:canvas.height/2},source_size: {w:32, h:32},
	    target_size: {w:42, h:42}, sprite:{sprite_x:0,sprite_y:32}, dx:7  },
	    {number:2, pos:{x:0, y:canvas.height/2+20},source_size: {w:32, h:32},
		    target_size: {w:42, h:42}, sprite:{sprite_x:0,sprite_y:32}, dx:7  }

]

img.src='img/player_sprites.png';


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
			alert(horses[idx].number+"번 말");
			gameOver=true;
		}
	}
}

function drawHorse() {						// 말 그리기
	for(var idx=0; idx<horses.length ;idx++) {
		 ctx.beginPath();
		    ctx.drawImage(
		            img,
		            horses[idx].sprite.sprite_x,
		            horses[idx].sprite.sprite_y,
		            horses[idx].source_size.w,
		            horses[idx].source_size.h,
		            horses[idx].pos.x,
		            horses[idx].pos.y,
		            32,
		            32
		        );
		    console.log("x pos"+horses[idx].pos.x);
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
    console.log(horseStatus);
    for(var idx=0; idx<horses.length; idx++){
    horses[idx].dx+=Math.random();
    horses[idx].pos.x+=horses[idx].dx;
    if(horses[idx].pos.x>canvas.width)
    	horses[idx].dx*=-1;
    horses[idx].sprite.sprite_x=(32*horseStatus);
    
    }
    // loop
    setTimeout(function() {
        requestAnimationFrame(draw);
      }, 1000 / 10);
}


draw();