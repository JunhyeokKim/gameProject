var canvas=document.getElementById("game");
var ctx=canvas.getContext("2d");
var gameOver=false;
var horseStatus=0;
var elapsedTime=0;
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
	}
	];
var rank=new Array(5);
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
		            horses[idx].target_size.w*2.2,
		            horses[idx].target_size.h*2.2
		        );
		    // console.log("x pos"+horses[idx].pos.x);
		    ctx.closePath();
		
	}
}
function drawMiniMap(){
	ctx.beginPath();
	ctx.fillStyle="rgba(100,100,100,0.2)";
	ctx.arc(160, 160, 100, Math.PI*1.5, Math.PI*0.5,true);
	ctx.fillRect(160, 60, 100, 200);
	ctx.fill();
	ctx.closePath();
	ctx.beginPath();
	ctx.arc(260, 160, 100, Math.PI*1.5, Math.PI*0.5,false);
	ctx.fill();
	ctx.closePath();
}
function drawElapasedTime(){
	ctx.beginPath();
	ctx.font="30px Arial";
	ctx.fillText("남은 거리:"+(1000-elapsedTime)+"M", canvas.width-290, 80, 100);
	ctx.closePath();
}
function drawScoreBoard(){
	ctx.beginPath();
	ctx.fillStyle="rgba(200,100,100,0.3)";
	ctx.fillRect(canvas.width-300, 100, 200, 600);
	ctx.closePath();
	ctx.beginPath();
	ctx.font="24px Arial";
	ctx.fillStyle="black";
	ctx.fillText("1등: "+rank[0].number, canvas.width-280, 160, 100);
	ctx.fillText("2등: "+rank[1].number, canvas.width-280, 180, 100);
	ctx.fillText("3등: "+rank[2].number, canvas.width-280, 200, 100);
	ctx.fillText("4등: "+rank[3].number, canvas.width-280, 220, 100);
	ctx.fillText("5등: "+rank[4]	.number, canvas.width-280, 240, 100);
	ctx.closePath();
}
function drawBackground(){
	ctx.beginPath();
	ctx.drawImage(
			backImg,
			bg_pos.x,
			bg_pos.y,
			bg_pos.swidth,
			bg_pos.sheight-140,
			bg_pos.dx,
			bg_pos.dy,
			bg_pos.dwidth,
			bg_pos.dheight/2
			);
	ctx.fillStyle="#804000";
	ctx.fillRect(0, bg_pos.dheight/2, canvas.width, canvas.height/2)
	ctx.closePath();
}

// swidth:1536, sheight:1536, dx:0, dy:0, dwidth:1000, dheight:1000
function draw() {
	elapsedTime++;
	// canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // object drawing section
    drawBackground();
    drawHorse();
    drawElapasedTime();
    drawMiniMap();
    collisionDetection();
    // object position setting
    horseStatus=(horseStatus<3)?horseStatus+1:0;
    // console.log(horseStatus);
    rank=new Array(5);
    for(var idx=0; idx<horses.length; idx++){
    	rank.push(horses[idx]);
    }
    rank.sort(function(a, b) {
    	if(a.pos.x>b.pos.x)
    		return -1;
    	else if(a.pos.x<b.pos.x)
    		return 1;
    	else
    		return 0;
    })
    console.log(rank);
  
    for(var idx=0; idx<horses.length; idx++){
    	horses[idx].rank=rank.indexOf(horses[idx]);
    	horses[idx].dx+=Math.random()*0.3;
    	horses[idx].pos.x+=horses[idx].dx;
    	if(horses[idx].pos.x<0 || horses[idx].pos.x>canvas.width-300)
    		horses[idx].dx*=-1;
    	horses[idx].sprite.sprite_x=(horses[idx].target_size.w*horseStatus);  
    }
    drawScoreBoard();
    if(bg_pos.x >= 3072) bg_pos.x =1 ;
    else bg_pos.x += 16;
    // configuration of FPS
    setTimeout(function() {
        requestAnimationFrame(draw);
      }, 1000/35);

}
draw();
