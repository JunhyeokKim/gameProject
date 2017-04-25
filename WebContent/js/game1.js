var canvas=document.getElementById("game");
var ctx=canvas.getContext("2d");
var mainLoop;									// main game
var initLoop;									// before game
var pause=false;								// game Check
var aniNum = 40;								// frame variable
var gameOver=false;								// is the game finished?
var winner;										// winner number
var iflag = true;								// is the game finished? - 2
var mStatus=0;									// mini horse statue
var background = {								// background setting
      x:0, y:0, image:{}, swidth:3072, sheight:1536, dx:0, dy:0, dwidth:canvas.width, dheight:canvas.height/2};
var fence={x:0, y:0, image:{}, swidth:960, sheight:80, dx:0, dy:canvas.height/2-80, dwidth:canvas.width*8, dheight:80};
// fence setting
var track={x:0, y:0, image:{}, swidth:960, sheight:342, dx:0, dy:canvas.height/2-40, dwidth:canvas.width*2, dheight:canvas.height/2};
// track image setting
var players=[];									// player setting
var tempX = 0;									// rest of distance
var rankPos = [70, 135, 200, 260, 310];			// mini horse position
var rankPosSize = [1.2, 1, 0.8, 0.6, 0.6];		// mini horse size
var horses=[									// horse object
	   {
	      number:1,image:{}, pos:{x:0, y:canvas.height/2-10},source_size: {w:128, h:128},	// num, img, pos, src size
	      mini:{arc_x:40,arc_y:40, arc_radius:10, arc_dx:0, arc_dy:0, arc_color:"golden"},
	      // mini map horse
	      sec:{image:{}, pos:{x:canvas.width-180, y:100}, sSize:{w:128, h:128}, tSize:{w:128, h:128}, sprite:{x:0, y:384}},
	      // score board horse
	      target_size: {w:128, h:128}, sprite:{sprite_x:0,sprite_y:0}, dx:7, rank:1, win_ratio:1.4,
	      // target size, sprite, acceleration, rank, winning
	      possibility:[0.6, 0.2, 0.2], dx_step:[-10,8,15], max_break:5, horseStatue:0, rankPosition:1.2,movedDistance:0
	      // moving mechanism
	   },
	   {
	      number:2,image:{}, pos:{x:0, y:canvas.height/2+30},source_size: {w:128, h:128},
	      mini:{arc_x:40,arc_y:40, arc_radius:10, arc_dx:0, arc_dy:0, arc_color:"brown"},
	      sec:{image:{}, pos:{x:canvas.width-180, y:150}, sSize:{w:128, h:128}, tSize:{w:128, h:128}, sprite:{x:0, y:384}},
	      target_size: {w:128, h:128}, sprite:{sprite_x:0,sprite_y:0}, dx:7, rank:1, win_ratio:1.9,
	      possibility:[0.3, 0.3, 0.4], dx_step:[-30,6,10], max_break:5, horseStatue:8, rankPosition:1,movedDistance:0
	   },
	   {
	      number:3,image:{}, pos:{x:0, y:canvas.height/2+80},source_size: {w:128, h:128},
	      mini:{arc_x:40,arc_y:40, arc_radius:10, arc_dx:0, arc_dy:0, arc_color:"black"},
	      sec:{image:{}, pos:{x:canvas.width-180, y:200}, sSize:{w:128, h:128}, tSize:{w:128, h:128}, sprite:{x:0, y:384}},
	      target_size: {w:128, h:128}, sprite:{sprite_x:0,sprite_y:0}, dx:7, rank:1, win_ratio:3.5,
	      possibility:[0.2, 0.6, 0.2], dx_step:[-13,2,9], max_break:5, horseStatue:3, rankPosition:0.8,movedDistance:0
	   },
	   {
	      number:4,image:{}, pos:{x:0, y:canvas.height/2+120},source_size: {w:128, h:128},
	      mini:{arc_x:40,arc_y:40, arc_radius:10, arc_dx:0, arc_dy:0, arc_color:"gray"},
	      sec:{image:{}, pos:{x:canvas.width-180, y:250}, sSize:{w:128, h:128}, tSize:{w:128, h:128}, sprite:{x:0, y:384}},
	      target_size: {w:128, h:128}, sprite:{sprite_x:0,sprite_y:0}, dx:7, rank:1, win_ratio:2.2,
	      possibility:[0.6, 0.2, 0.2], dx_step:[-6,7,9], max_break:5, horseStatue:6, rankPosition:0.6,movedDistance:0
	   },
	   {
	      number:5, image:{}, pos:{x:0, y:canvas.height/2+200},source_size: {w:128, h:128},
	      mini:{arc_x:40,arc_y:40, arc_radius:10, arc_dx:0, arc_dy:0, arc_color:"white"},
	      sec:{image:{}, pos:{x:canvas.width-180, y:300}, sSize:{w:128, h:128}, tSize:{w:128, h:128}, sprite:{x:0, y:384}},
	      target_size: {w:128, h:128}, sprite:{sprite_x:0,sprite_y:0}, dx:7, rank:1, win_ratio:10.0,
	      possibility:[0.5, 0.45, 0.05], dx_step:[-20,4,80], max_break:5, horseStatue:2, rankPosition:0.6,movedDistance:0
	   }
	   ];
var miniMap={distance:1000,image:{},sx:40,sy:60,swidth:1000,sheight:50,dx:40,dy:60,dwidth:1000,dheight:50,color:"rgba(200,100,100,0.3)"};
// miniMap
var scoreBoard={box:{color:"rgba(100,100,100,0.2)",box_x:canvas.width-300, box_y:100, width:270, height:300},text:{text_color:"black", text_x:canvas.width-280,text_y:160, text_maxW:100},n:horses.length};
// score board
var timeBoard={x:canvas.width-290,y:80, maxW:270};								// distance board
var finishLine={image: {},swidth:80, sheight:192, dx:canvas.width, dy:600, dwidth:100, dheight:300 }	// finish or start?
var rank=new Array(horses.length);												// rank
var numbers=[
	   {number:1,image:{},x:0,y:0,dx:canvas.width/2-150,dy:canvas.height/2-335, swidth:250, sheight:335, dwidth:250, dheight:335},
	   {number:2,image:{},x:0,y:0,dx:canvas.width/2-150,dy:canvas.height/2-335, swidth:250, sheight:335, dwidth:250, dheight:335},
	   {number:3,image:{},x:0,y:0,dx:canvas.width/2-150,dy:canvas.height/2-335, swidth:250, sheight:335, dwidth:250, dheight:335}
	   ];
var startLine={image:{},x:0,y:0,swidth:282, sheight:700, dx:300, dy:canvas.height/2, dwidth:282, dheight:700};
function collisionDetection() {													// finish game
	var resMsg = new Array(5);													// result message
	if(!gameOver)
		$.each(horses,function(index,horse){
			if(miniMap.distance<=0){											// rest of distance
				if(horse.rank==0){
					alert("NO. "+horse.number+" horse is Won!!");
					winner = horse.number;										// save a winner number
				}
				resMsg[index] = rank[index].number;
				gameOver = true;												// almost finish
			}
		});
	if(gameOver&&iflag){														// almost finish
		var msg="<br>";
		$.each(resMsg, function(index,res){
			msg +="<h"+(index+1)+">"+(index+1)+". : NO. "+res+" horse</h"+(1+index)+"><br>";
		})																		// result print
		msg += "<h2>Thank You!</h2>";
		$("#gameResult").html(msg);
		$("#gameResult").fadeIn(3000);
		//$("#gameResult").css("display","block");
		giveBackMoney(winner);													// menu.js - only winner can get money
		iflag = false;															// real finish game
		aniNum = 40;															// animation frame
	}
}

function drawHorse() {															// horse Picture
   $.each(horses,function(index,horse){
       ctx.beginPath();
          ctx.drawImage(
                  horse.image,
                  horse.sprite.sprite_x,
                  horse.sprite.sprite_y,
                  horse.source_size.w,
                  horse.source_size.h,
                  horse.pos.x,
                  horse.pos.y-85,
                  horse.target_size.w*(1+(0.5*horse.number)),
                  horse.target_size.h*(1+(0.5*horse.number))
              );
          ctx.closePath();
   });
}
function drawMiniHorse() {														// scoreBoard horse
	$.each(horses,function(index,horse){
		ctx.beginPath();
		ctx.drawImage(
				horse.sec.image,
				horse.sec.sprite.x,
				horse.sec.sprite.y,
				horse.sec.sSize.w,
				horse.sec.sSize.h,
				horse.sec.pos.x,
				horse.sec.pos.y,
				horse.sec.tSize.w*horse.rankPosition,
				horse.sec.tSize.h*horse.rankPosition
		);
		ctx.closePath();
	});
}
function drawMiniMap(){
	 ctx.beginPath();
     ctx.fillStyle=miniMap.color;
     ctx.fillRect(miniMap.dx, miniMap.dy, miniMap.dwidth, miniMap.dheight);
     ctx.st
     ctx.stroke();
     $.each(rank.reverse(),function(index,horse){
        if(1000-horse.movedDistance*0.06>0)
        ctx.drawImage(
              horse.sec.image,
              horse.sec.sprite.x,
              horse.sec.sprite.y,
              horse.sec.sSize.w,
              horse.sec.sSize.h,
              horse.movedDistance*0.02,
              horse.mini.arc_y,
              horse.sec.tSize.w,
              horse.sec.tSize.h
        );
     })
     ctx.closePath();
     rank.reverse();
}
function drawElapasedTime(){													// rest of distance
	ctx.beginPath();
	ctx.font="30px Arial";
	ctx.fillStyle="black";
	for(var i=0; i<horses.length; i++){
		if(horses[i].rank == 0);{
			if(tempX<horses[i].pos.x) tempX = horses[i].pos.x;
			miniMap.distance = 1000-tempX;	// ROD
		}
	}
	if(!gameOver)
		ctx.fillText("Rest of Distance : "+parseInt((miniMap.distance))+" M", timeBoard.x, timeBoard.y, timeBoard.maxW);
	else ctx.fillText("Winner : NO. "+winner+" horse", timeBoard.x, timeBoard.y, timeBoard.maxW);	// winner number
   ctx.closePath();
}
function drawScoreBoard(){
   ctx.beginPath();
   ctx.fillStyle=scoreBoard.box.color;
   ctx.fillRect(scoreBoard.box.box_x, scoreBoard.box.box_y, scoreBoard.box.width, scoreBoard.box.height);
   ctx.closePath();
   ctx.beginPath();
   ctx.fillStyle=scoreBoard.text.text_color;
   for(var idx=0; idx<scoreBoard.n; idx++){
      switch(idx)																// rank
      {
	      case 0:
	    	  ctx.font="36px Arial";
	    	  ctx.fillText((idx+1)+"st : "+rank[idx].number, scoreBoard.text.text_x, scoreBoard.text.text_y+50*idx, 100);
	    	  break;
	      case 1:
	    	  ctx.font="31px Arial";
	    	  ctx.fillText((idx+1)+"nd : "+rank[idx].number, scoreBoard.text.text_x, scoreBoard.text.text_y+53*idx, 100);
	    	  break;
	      case 2:
	    	  ctx.font="28px Arial";
	    	  ctx.fillText((idx+1)+"rd : "+rank[idx].number, scoreBoard.text.text_x, scoreBoard.text.text_y+50*idx, 100);
	    	  break;
	      default:
	    	  ctx.font="24px Arial";
	    	  ctx.fillText((idx+1)+"th : "+rank[idx].number, scoreBoard.text.text_x, scoreBoard.text.text_y+50*idx, 100);
      }
   }
   ctx.closePath();
}
function drawBackground(dx){
	if(!gameOver){
	   if(background.x >=3072) background.x =0 ;
	   else background.x += dx;
	}
	   ctx.beginPath();
	   ctx.drawImage(
	         background.image,
	         background.x,
	         background.y,
	         background.swidth,
	         background.sheight,
	         background.dx,
	         background.dy,
	         background.dwidth,
	         background.dheight
	         );
	   ctx.closePath();
	}
function drawTrack(){
   ctx.beginPath();
   ctx.drawImage(
         track.image,
         track.x,
         track.y,
         track.swidth,
         track.sheight,
         track.dx,
         track.dy+40,
         track.dwidth,
         track.dheight*1.35
         );
   ctx.closePath();
   
}

function calDx(horse){														// moving mechanism
	   var ranDx=Math.random();
	   var disRand=Math.random();
	   
	   if(horse.pos.x>canvas.width/3 &&  horse.max_break>0){				// i don't know
	      horse.dx-=1.2;													// jun hyeok kim will explain this code.
	      horse.max_break--;
	      }
	   else{
	      if(ranDx<=horse.possibility[0]){
	       
	         horse.dx=disRand*horse.dx_step[0]*0.4;
	      }else if(ranDx<=horse.possibility[0]+horse.possibility[1]){
	        horse.movedDistance+=(horse.dx_step[1]<0)?0:horse.dx_step[1]*0.4;
	         horse.dx=disRand*0.4+horse.dx_step[1]*0.4;
	      }else{
	        horse.movedDistance+=(horse.dx_step[2]<0)?0:horse.dx_step[2]*0.4;
	         horse.dx=disRand*0.2+horse.dx_step[2]*0.4;
	      }
	      if(horse.max_break<5)
	         horse.max_break++;
	   }
	   horse.movedDistance+=20+horse.dx;
	   if(!gameOver) horse.pos.x+=horse.dx;
	   else horse.pos.x +=(20+horse.dx)*3;
}
function drawStartLine(dx, xPos){
	   if(xPos!=undefined)
	      startLine.dx=xPos;
	   if(startLine.dx >=start.width) startLine.x =0 ;
	   else startLine.dx -= dx;
	   ctx.beginPath();
	      ctx.drawImage(
	            startLine.image,
	            startLine.x,
	            startLine.y,
	            startLine.swidth,
	            startLine.sheight,
	            startLine.dx,
	            startLine.dy,
	            startLine.dwidth,
	            startLine.dheight
	            );
	      ctx.closePath();
	}
function drawGoalLine(){
   ctx.beginPath();
   ctx.drawImage(
         finishLine.image,
         0,
         0,
         finishLine.swidth,
         finishLine.sheight,
         finishLine.dx,
         finishLine.dy,
         finishLine.dwidth,
         finishLine.dheight
         );
   ctx.closePath();
}
function drawFenceBack(){
   ctx.beginPath();
   ctx.drawImage(
         fence.image,
         fence.x,
         fence.y,
         fence.swidth,
         fence.sheight,
         fence.dx,
         fence.dy+33,
         fence.dwidth*0.25,
         fence.dheight*0.6
         );
   ctx.closePath();
}

function drawFenceFront(dx){
	if(!gameOver){
	   if(fence.x>=240) fence.x=0;
	   else fence.x+=dx;
	}
	   ctx.beginPath();
	   ctx.drawImage(
	         fence.image,
	         fence.x,
	         fence.y,
	         fence.swidth,
	         fence.sheight,
	         fence.dx,
	         fence.dy+420,
	         fence.dwidth*0.5,
	         fence.dheight*2
	         );
	   ctx.closePath();
	}

function updateHorse(){														// moving mechanism 2
	var isFirst=true;
	// horse update(pos, animation frame)..
	$.each(horses,function(idx, horse){
		horse.rank=rank.indexOf(horse);										// rank save 
		horse.sec.pos.y = rankPos[horse.rank];								// mini horse position
		horse.rankPosition = rankPosSize[horse.rank];						// mini horse size
		calDx(horse);
		horse.sprite.sprite_x=(horse.target_size.w*horse.horseStatue);		// horse size
		horse.sec.sprite.x=(horse.sec.tSize.w*mStatus);						// mini horse size
		horse.horseStatue=(horse.horseStatue<10)?horse.horseStatue+1:0;		// movings
	});
}

function updateRank(){
	 rank = new Array();
	    $.each(horses,function(idx,horse){
	          rank.push(horse);
	       });
	       rank.sort(function(a, b) {
	          if(a.pos.x>b.pos.x)
	             return -1;
	          else if(a.pos.x<b.pos.x)
	             return 1;
	          else
	             return 0;
	       })
}
function drawCount(){
	
}
function loadImage(){
	  // init image
    $.each(horses,function(index,horse ){
       var horseImg=new Image();
       var horseMiniImg = new Image();
       horseImg.src="img/horse-"+index+".png";
       horseMiniImg.src="img/horse--"+index+".png";
       horse.image=horseImg;
       horse.sec.image=horseMiniImg;
    })
    var trackImage=new Image();
    trackImage.src="img/track1.png";
    var backImage=new Image();
    backImage.src='img/hihi.png';
    var finishLineImage=new Image();
    finishLineImage.src= 'img/finish_line.png';
    var fenceImage=new Image();
    fenceImage.src="img/fence.png";
    var num1Image=new Image();
    num1Image.src="img/number1.png";
    var num2Image=new Image();
    num2Image.src="img/number2.png";
    var num3Image=new Image();
    num3Image.src="img/number3.png";
    var startLineImage=new Image();
    startLineImage.src="img/gg.png";
   

   
    
    numbers[0].image=num1Image;
    numbers[1].image=num2Image;
    numbers[2].image=num3Image;
    track.image=trackImage;
    fence.image=fenceImage;
    finishLine.image=finishLineImage;
    background.image=backImage;
    startLine.image=startLineImage;
}

function loadLevel(){
	loadImage();
	initView();
	flowView();
}

function draw() {

	if(miniMap.distance<=100) aniNum = 20;
	// canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	// object drawing section
	drawBackground(16);
	drawStartLine(20);
	drawTrack();
	drawFenceBack();
	drawHorse();
	drawMiniHorse();
	drawFenceFront(8);
	collisionDetection();
	// object position setting
	mStatus=(mStatus<3)?mStatus+1:0;
	rank = new Array(horses.length);
	updateRank();
	updateHorse();
	drawElapasedTime();
	drawScoreBoard();
	drawMiniMap();
	// configuration of FPS
	mainLoop=setTimeout(function(){
		requestAnimationFrame(draw);
	}, 1000/35);
}

function initView(){
	   background.image.onload=function(){
	      drawBackground(0);
	   }
	   track.image.onload=function(){
	      drawTrack();
	   }
	   startLine.image.onload=function(){
	         drawStartLine(0);
	      }
	   fence.image.onload=function(){
	      drawFenceBack();
	      drawFenceFront(0);
	   }
}

function flowView(){
	drawBackground(8);
	drawTrack();
	drawFenceBack();
	 drawStartLine(6);
	drawFenceFront(2);
	initLoop=setTimeout(function(){
		if(pause) return;
		window.requestAnimationFrame(flowView);
		}, 1000/aniNum);
}
function drawCount(t){
    ctx.beginPath();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBackground(0);
       drawTrack();
       drawStartLine(0,90);
       drawFenceBack();
       drawHorse();
       drawFenceFront(0);
    ctx.drawImage(t.image,
          t.x,
          t.y,
          t.swidth,
          t.sheight,
          t.dx,
          t.dy,
          t.dwidth,
          t.dheight
          );
    ctx.closePath();
 }
function count(){
    setTimeout(function() {
       if(numbers.length==0)
          return ;
       drawCount(numbers.pop());
          window.requestAnimationFrame(count);
       }, 1000);
 }
function init(){
	 // start main loop
	   pause=true;
	   background.x=0;
	   count();
	   window.setTimeout(draw, 4000)
}



