/* $( function() {
			$( ".horseSelect" ).accordion({
				collapsible: true});
			}); */


// 드래그 방지
$(document).on("dragstart", function(e) {
	return false;
});

// 선택 방지
$(document).on("selectstart", function(e) {
	return false;
});
$("#betBtn").on("mousedown", function() {
	$("#betBtn").css({
		"background" : "#202020",
		"border" : "9.5px solid #505050",
		"color" : "#bbbbbb",
		"height" : "57px",
		"width" : "190px"
	});
})
$("#betBtn").on("mouseup", function() {
	$("#betBtn").css({
		"background" : "gray",
		"border" : "10px solid #505050",
		"color" : "black",
		"height" : "60px",
		"width" : "200px"
	});
})

$("img").on("click", function() {
	$(".horseSelect").accordion({
		active : false,
		collapsible : true
	});
	/* $(".status").css("display","none"); */
});
$("#start-menu").on("click", function() {
	start();
	
})

$(document).ready(function() {
	loadLevel();
});

function start() {
	
	$("#menus").hide("fade",{direction:"down",},"slow",function(){
		init();
	});
	
}


function call() {
	hohoho = document.getElementsByClassclass("horseImg");
	if (hohoho[2].onclick) {
		console.log(hohoho[0].onclick);
		console.log(hohoho[0].src);
		console.log(hohoho[1].src);
	}
}