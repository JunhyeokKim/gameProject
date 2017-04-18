var canvas=document.getElementById("game");
var ctx=canvas.getContext("2d");
var gameOver=false;
var horseStatus=0;
var elapsedTime=0;
var background = {
		x:0, y:0, image:'img/hihi.png', swidth:1536, sheight:1536, dx:0, dy:0, dwidth:canvas.width, dheight:canvas.height
};

var horses=[
	{
		number:1,image:"img/horse-black.png", pos:{x:0, y:canvas.height/2},source_size: {w:128, h:128},
		mini:{arc_x:180,arc_y:80, arc_radius:10, arc_dx:0, arc_dy:0, arc_color:"rgba(255,100,0,0.5)",inCircle:false},
		target_size: {w:128, h:128}, sprite:{sprite_x:0,sprite_y:384}, dx:7, rank:1
	},
	{
		number:2,image:"img/horse-brown.png", pos:{x:0, y:canvas.height/2+20},source_size: {w:128, h:128},
		mini:{arc_x:180,arc_y:80, arc_radius:10, arc_dx:0, arc_dy:0, arc_color:"rgba(100,100,0,0.5)",inCircle:false},
		target_size: {w:128, h:128}, sprite:{sprite_x:0,sprite_y:384}, dx:7 ,rank:1
	},
	{
		number:3,image:"img/horse-golden.png", pos:{x:0, y:canvas.height/2+20},source_size: {w:128, h:128},
		mini:{arc_x:180,arc_y:80, arc_radius:10, arc_dx:0, arc_dy:0, arc_color:"rgba(0,100,255,0.5)", inCircle:false},
		target_size: {w:128, h:128}, sprite:{sprite_x:0,sprite_y:384}, dx:7 ,rank:1
	},
	{
		number:4,image:"img/horse-gray.png", pos:{x:0, y:canvas.height/2+20},source_size: {w:128, h:128},
		mini:{arc_x:180,arc_y:80, arc_radius:10, arc_dx:0, arc_dy:0, arc_color:"rgba(0,0,100,0.5)",inCircle:false},
		target_size: {w:128, h:128}, sprite:{sprite_x:0,sprite_y:384}, dx:7 ,rank:1
	},
	{
		number:5,image:"img/horse-white.png", pos:{x:0, y:canvas.height/2+20},source_size: {w:128, h:128},
		mini:{arc_x:180,arc_y:80, arc_radius:10, arc_dx:0, arc_dy:0, arc_color:"rgba(100,100,100,0.5)",inCircle:false},
		target_size: {w:128, h:128}, sprite:{sprite_x:0,sprite_y:384}, dx:7 ,rank:1
	}
	];
var miniMap={appearance:{color:"rgba(100,100,100,0.2)",left_arcX:160, left_arcY:160, arc_radius:100,right_arcX:260,right_arcY:160,anticlock:true,rect_x:160, rect_y:60, rect_width:100, rect_height:200}, distance:1000};
// 160, 60, 100, 200
var scoreBoard={box:{color:"rgba(100,100,100,0.2)",box_x:canvas.width-300, box_y:100, width:200, height:600},text:{text_color:"black",font:"24px Arial", text_x:canvas.width-280,text_y:160, text_maxW:100},n:horses.length};
var timeBoard={x:canvas.width-290,y:80, maxW:100};
var rank=new Array(5);
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
		var img=new Image();
		img.src=horses[idx].image;
		 ctx.beginPath();
		    ctx.drawImage(
		            img,
		            horses[idx].sprite.sprite_x,
		            horses[idx].sprite.sprite_y,
		            horses[idx].source_size.w,
		            horses[idx].source_size.h,
		            horses[idx].pos.x,
		            horses[idx].pos.y+32*idx,
		            horses[idx].target_size.w*1.7,
		            horses[idx].target_size.h*1.7
		        );
		    // console.log("x pos"+horses[idx].pos.x);
		    ctx.closePath();
	}
}
function drawMiniMap(){
	ctx.beginPath();
	ctx.fillStyle=miniMap.appearance.color;
	ctx.arc(miniMap.appearance.left_arcX, miniMap.appearance.left_arcY, miniMap.appearance.arc_radius, Math.PI*1.5, Math.PI*0.5,miniMap.appearance.anticlock);
	ctx.fillRect(miniMap.appearance.rect_x, miniMap.appearance.rect_y, miniMap.appearance.rect_width, miniMap.appearance.rect_height);
	ctx.fill();
	ctx.closePath();
	ctx.beginPath();
	ctx.arc(miniMap.appearance.right_arcX, miniMap.appearance.right_arcY, miniMap.appearance.arc_radius, Math.PI*1.5, Math.PI*0.5,!miniMap.appearance.anticlock);
	ctx.fill();
	ctx.closePath();
	
	for(var idx=0; idx<horses.length; idx++){
		ctx.beginPath();
		ctx.fillStyle=horses[idx].mini.arc_color;
		ctx.arc(horses[idx].mini.arc_x, horses[idx].mini.arc_y, horses[idx].mini.arc_radius, 0, Math.PI*2);
		ctx.fill();
		ctx.closePath();
	}
}
function drawElapasedTime(){
	ctx.beginPath();
	ctx.font="30px Arial";
	ctx.fillText("남은 거리:"+(miniMap.distance-elapsedTime)+"M", timeBoard.x, timeBoard.y, timeBoard.maxW);
	ctx.closePath();
}
function drawScoreBoard(){
	ctx.beginPath();
	ctx.fillStyle=scoreBoard.box.color;
	ctx.fillRect(scoreBoard.box.box_x, scoreBoard.box.box_y, scoreBoard.box.width, scoreBoard.box.height);
	ctx.closePath();
	ctx.beginPath();
	ctx.font=scoreBoard.text.font;
	ctx.fillStyle=scoreBoard.text.text_color;
	for(var idx=0; idx<scoreBoard.n; idx++){
	ctx.fillText((idx+1)+"등: "+rank[idx].number, scoreBoard.text.text_x, scoreBoard.text.text_y+30*idx, 100);
	}
	ctx.closePath();
}
function drawBackground(){
	ctx.beginPath();
	var img=new Image();
	img.src=background.image;
	ctx.drawImage(
			img,
			background.x,
			background.y,
			background.swidth,
			background.sheight-140,
			background.dx,
			background.dy,
			background.dwidth,
			background.dheight/2
			);
	ctx.fillStyle="#804000";
	ctx.fillRect(0, background.dheight/2, canvas.width, canvas.height/2)
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
    rank=new Array(horses.length);
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
    
    // horse update(pos, animation frame)..
    $.each(horses,function(idx, horse){
    	horse.rank=rank.indexOf(horse);
    	var ranDx=Math.random()*0.3;
    	horse.dx+=ranDx;
    	//hohoho
    	horse.pos.x+=horse.dx;
    	if(horse.pos.x<0 || horse.pos.x>canvas.width-300)
    		horse.dx*=-1;
    	horse.sprite.sprite_x=(horse.target_size.w*horseStatus);  
    	horse.mini.arc_x+=horse.mini.arc_dx;
    	horse.mini.arc_y+=horse.mini.arc_dy;
    	if(horse.mini.arc_x>=miniMap.appearance.rect_x && horse.mini.arc_x<=miniMap.appearance.rect_x+miniMap.appearance.rect_width){    			
    		if(horse.mini.inCircle){
    		console.log("if inCircle");
    		horse.mini.arc_dx=-Math.abs(horse.dx*0.3);

    		
    		
    		}else{
    			console.log("if !inCircle");
    			horse.mini.arc_dx=Math.abs(horse.dx*0.3);
        		horse.mini.arc_dy=0;
    		}
    	}
    	else{
    		if(horse.mini.inCircle){
    			console.log("else inCircle");
    			horse.mini.arc_dx=miniMap.appearance.arc_radius*Math.cos(elapsedTime*0.02)*0.02;
            	horse.mini.arc_dy=miniMap.appearance.arc_radius*Math.sin(elapsedTime*0.02)*0.02;	
    		}else{
    			console.log("else !inCircle");
    			horse.mini.arc_dx=miniMap.appearance.arc_radius*Math.cos(elapsedTime*0.02)*0.02;
    			if(horse.mini.arc_x+horse.mini.arc_dx<miniMap.appearance.rect_x)
    				horse.mini.arc_dx*=1.8;
    			
    		}
        	horse.mini.inCircle=!horse.mini.inCircle;
    	}
    	
    });
    drawScoreBoard();
    if(background.x >= 3072) background.x =1 ;
    else background.x += 16;
    // configuration of FPS
    setTimeout(function() {
        requestAnimationFrame(draw);
      }, 1000/35);

}
draw();
