var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var gameOver=false;
var horseStatus=0;
var bg_pos = {
		x:0, y:0, swidth:1536, sheight:1536, dx:0, dy:0, dwidth:canvas.width, dheight:canvas.height
};


var img=new Image();
var backImg=new Image();
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
backImg.src='img/hihi.png';
function collisionDetection() {
	if(!gameOver)
	for(var idx=0; idx<horses.length; idx++){
		if(horses[idx].pos.x>=canvas.width*0.8){
			alert(horses[idx].number+"번 말 우승!");
			gameOver=true;
		}
	}
}

function drawHorse() {						// 말 그림
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
	ctx.drawImage(
			backImg,
			bg_pos.x,
			bg_pos.y,
			bg_pos.swidth,
			bg_pos.sheight,
			bg_pos.dx,
			bg_pos.dy,
			bg_pos.dwidth,
			bg_pos.dheight
			);
	ctx.closePath();
}
// swidth:1536, sheight:1536, dx:0, dy:0, dwidth:1000, dheight:1000

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
    	if(horses[idx].pos.x<0)
    		horses[idx].dx*=-1;
    	horses[idx].sprite.sprite_x=(horses[idx].target_size.w*horseStatus);  
    }
    if(bg_pos.x >= 3072) bg_pos.x =0 ;
    else bg_pos.x += 24;
    console.log(bg_pos);
    // configuration of FPS
    setTimeout(function() {
        requestAnimationFrame(draw);
      }, 0.1);

}


draw();