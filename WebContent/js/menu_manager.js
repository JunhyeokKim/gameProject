var bettingMoney = document.getElementById("betMoney");
var runHorse = document.getElementsByClassName("horseImg");
var player = [
	{
		myMoney:100000000, curMoney:100000000, playerBetMoney:0, horseNum:NaN
	}
	]

// No Drag!!!
$(document).on("dragstart", function(e) {
	return false;
});

// No Select!!
$(document).on("selectstart", function(e) {
	return false;
});
$("#start-menu").on("mousedown", function() {
	$("#start-menu").css({
		"background" : "#202020",
		"border" : "9px solid #505050",
		"color" : "#bbbbbb",
		"height" : "47.5px",
		"width" : "190px",
		"borderRadius":"9px 9px 9px 9px"
	});
})
$("#start-menu").on("mouseup", function() {
	$("#start-menu").css({
		"background" : "gray",
		"border" : "10px solid #505050",
		"color" : "black",
		"height" : "50px",
		"width" : "200px",
		"borderRadius":"10px 10px 10px 10px"
	});
})

$("#betBtn").on("click",function(){
	player[0].playerBetMoney = bettingMoney.value;
	betting();
})
$("#allInBtn").on("click",function(){
	if(Number(player[0].horseNum)){
		bettingMoney.value = player[0].myMoney;
		player[0].playerBetMoney = bettingMoney.value;
		document.getElementById("allInBtn").disabled = true;
		betting();
	}else alert("Select a horse first!");
})

$(".horseImg").each(function(index,item){
		$(this).on("mousedown",function(){
			$(".horseSelect").accordion({
				active : false,
				collapsible : true
			});
			player[0].horseNum = (index+1);
			console.log(player[0].horseNum)
		})
})

$("#start-menu").on("click", function() {
	if(document.getElementById("betBtn").disabled) start();
	else alert("諛고똿 癒쇱� �빐二쇱꽭�슂.");
})

$(document).ready(function() {
	loadLevel();
});

curMyMoney();

function start() {
	$("#menus").hide("fade",{direction:"down",},"slow",init);
}

function betting(){
	
	if((parseInt(player[0].playerBetMoney)%1000)==0){
		player[0].curMoney = player[0].myMoney - player[0].playerBetMoney;
		if(parseInt(player[0].playerBetMoney)+player[0].curMoney <= player[0].myMoney){
			if(Number(player[0].horseNum)){
				document.getElementById("betBtn").disabled = true;
				document.getElementById("betMoney").disabled = true;
				selectFunc(player[0].horseNum);
				curMyMoney();
				console.log(player[0].curMoney);
				console.log(player[0].playerBetMoney);
			}else alert("留먯쓣 癒쇱� �꽑�깮�빐二쇱꽭�슂.");
		}else{
			alert("Not enough money!");
		}
	}else alert("諛고똿 湲덉븸�쓽 理쒖냼 �떒�쐞�뒗 1000�썝 �엯�땲�떎.");
}

function giveBackMoney(winner){
	
	console.log("Player select : "+player[0].horseNum);
	console.log("winner : "+winner);
	
	if(player[0].horseNum == winner){
		alert("You Win!");
		switch(winner)
		{
			case 1:
				player[0].myMoney = (player[0].playerBetMoney)*3.5 + player[0].curMoney;
				break;
			case 2:
				player[0].myMoney = (player[0].playerBetMoney)*2 + player[0].curMoney;
				break;
			case 3:
				player[0].myMoney = (player[0].playerBetMoney)*2.5 + player[0].curMoney;
				break;
			case 4:
				player[0].myMoney = (player[0].playerBetMoney)*3 + player[0].curMoney;
				break;
			case 5:
				player[0].myMoney = (player[0].playerBetMoney)*1.1 + player[0].curMoney;
				break;
			
		}
		
	}
	else{
		alert("You Lose!");
		player[0].myMoney = player[0].curMoney;
	}
	console.log("Betting Money : "+player[0].playerBetMoney);
	console.log("Total Money : "+player[0].myMoney);
}

function selectFunc(tdNum){
	$(".horseSelcet").eq(tdNum).css("background","pink");
}

function curMyMoney(){
	$("#curMoney").val(player[0].curMoney);
}

