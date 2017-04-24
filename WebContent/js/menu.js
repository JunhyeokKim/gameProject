var runHorse = document.getElementsByClassName("horseImg");

/* $( function() {
			$( ".horseSelect" ).accordion({
				collapsible: true});
			}); */


// �뱶�옒洹� 諛⑹�
$(document).on("dragstart", function(e) {
	return false;
});

// �꽑�깮 諛⑹�
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
	
	$("#menus").hide("fade",{direction:"down",},"slow",init);
	
}

/*function runningHorse() {                  // horse Picture
	$.each(runHorse,function(index,horse){
		$(horse).hover(
			ctx.beginPath();
			ctx.drawImage(
				horse.src = "img/horse-0",
				0,
				384,
				128,
				128,
				0,
				0,
				horse.target_size.w*(1+(0.5*horse.number)),
				horse.target_size.h*(1+(0.5*horse.number))
			);
			// console.log("x pos"+horse.pos.x);
			ctx.closePath();
		);
	});
}*/


function call() {
	hohoho = document.getElementsByClassclass("horseImg");
	if (hohoho[2].onclick) {
		console.log(hohoho[0].onclick);
		console.log(hohoho[0].src);
		console.log(hohoho[1].src);
	}
}