var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var gameOver=false;
var horseStatus=0;


var img=new Image();
var horses=[
	{
		number:1, pos:{x:0, y:canvas.height/2},source_size: {w:128, h:128},
		target_size: {w:128, h:128}, sprite:{sprite_x:0,sprite_y:384}, dx:7, rank:1
	},
	{
		number:2, pos:{x:0, y:canvas.height/2+20},source_size: {w:128, h:128},
		target_size: {w:128, h:128}, sprite:{sprite_x:0,sprite_y:384}, dx:7 ,rank:1
	},
	{
		number:3, pos:{x:0, y:canvas.height/2+20},source_size: {w:128, h:128},
		target_size: {w:128, h:128}, sprite:{sprite_x:0,sprite_y:384}, dx:7 ,rank:1
	},
	{
		number:4, pos:{x:0, y:canvas.height/2+20},source_size: {w:128, h:128},
		target_size: {w:128, h:128}, sprite:{sprite_x:0,sprite_y:384}, dx:7 ,rank:1
	},
	{
		number:5, pos:{x:0, y:canvas.height/2+20},source_size: {w:128, h:128},
		target_size: {w:128, h:128}, sprite:{sprite_x:0,sprite_y:384}, dx:7 ,rank:1
	},
	{
		number:6, pos:{x:0, y:canvas.height/2+20},source_size: {w:128, h:128},
		target_size: {w:128, h:128}, sprite:{sprite_x:0,sprite_y:384}, dx:7 ,rank:1
	},
	{
		number:7, pos:{x:0, y:canvas.height/2+20},source_size: {w:128, h:128},
		target_size: {w:128, h:128}, sprite:{sprite_x:0,sprite_y:384}, dx:7 ,rank:1
	},
	{
		number:8, pos:{x:0, y:canvas.height/2+20},source_size: {w:128, h:128},
		target_size: {w:128, h:128}, sprite:{sprite_x:0,sprite_y:384}, dx:7 ,rank:1
	}
	]

img.src='img/horse-black.png';

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
		    // console.log("x pos"+horses[idx].pos.x);
		    ctx.closePath();
		
	}
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
    drawHorse();
    collisionDetection();
    // object position setting
    horseStatus=(horseStatus<3)?horseStatus+1:0;
    // console.log(horseStatus);
    var rank=new Array();
    for(var idx=0; idx<horses.length; idx++){
    	rank.push(horses[idx]);
    }
    rank.sort(function(a, b) {
    	return b.pos.x-a.pos.x;
    })
  
    for(var idx=0; idx<horses.length; idx++){
    	horses[idx].rank=rank.indexOf(horses[idx]);
    	horses[idx].dx+=Math.random();
    	horses[idx].pos.x+=horses[idx].dx;
    	if(horses[idx].pos.x>canvas.width-400 || horses[idx].pos.x<0)
    		horses[idx].dx*=-1;
    	horses[idx].sprite.sprite_x=(horses[idx].target_size.w*horseStatus);
    
    
    }
    console.log(rank[0].number);
    // configuration of FPS
    setTimeout(function() {
        requestAnimationFrame(draw);
      }, 1000 / 20);
}


draw();