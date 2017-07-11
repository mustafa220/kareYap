var windowWidth = $(window).width();
var windowHeight = $(window).height();
/*
	anyMenu
		0 : loginFrm
		1 : mainScreen
		2 : playWithFriend
		3 : playWithQuick
		4 : about
*/
var line = function(){
	this.active = false;
}
var node = function(){
	this.top = undefined;
	this.right = undefined;
	this.left = undefined;
	this.bottom = undefined;
	this.topLine = new line();
	this.rightLine = new line();
	this.leftLine = new line();
	this.bottomLine = new line();
	this.next = undefined;
	this.x = 0;
	this.y = 0;
}
var bl = function(){
	this.size = 0;
	this.x = 0;
	this.y = 0;
	this.root = undefined;
	this.last = undefined;
	this.user1Score = 0;
	this.user2Score = 0;
	this.user2IsRobot = false;
	this.sira = 1;
	this.set = function(size){
		this.size = parseInt(size) - 1;
	}
	this.create = function(){
		if(this.size > 1 ){
			for(var i=0; i <= this.size; i++){
				for(var j = 0; j <= this.size; j++){
					var newNode = new node;
					newNode.x = i;
					newNode.y = j;
					if(this.root == undefined){
						this.root = newNode;
						this.last = newNode;
					}
					else{
						this.last.next = newNode;
						this.last = newNode;
					}
				}
			}
		}
	}
	this.first = function(){
		var temp = this.root;
		while(temp != undefined){
			if(temp.x == 0 & temp.y == 0){// sol üst köşe
				temp.topLine.active = true;
				temp.leftLine.active = true;
				temp.rightLine.active = false;
				temp.bottomLine.active = false;
			}
			else if(temp.x == 0 & temp.y > 0){ // en sol satır
				temp.topLine.active = false;
				temp.leftLine.active = true;
				temp.rightLine.active = false;
				temp.bottomLine.active = false;
				if(temp.y == this.size){ // sol alt köşe
					temp.bottomLine.active = true;
				}
			}
			else if(temp.y == 0 & temp.x > 0){ // en üst satır
				temp.topLine.active = true;
				temp.leftLine.active = false;
				temp.rightLine.active = false;
				temp.bottomLine.active = false;
				if(temp.x == this.size){ // sağ üst köşe
					temp.rightLine.active = true;
				}
			}
			else if(temp.y == this.size & temp.x > 0){ // en alt satır
				temp.topLine.active = false;
				temp.leftLine.active = false;
				temp.rightLine.active = false;
				temp.bottomLine.active = true;
				if(temp.x == this.size & temp.y == this.size){// sağ alt köşe
					temp.rightLine.active = true;
				}
			}
			else if(temp.x == this.size & temp.y > 0){ // en sağ satır
				temp.topLine.active = false;
				temp.leftLine.active = false;
				temp.rightLine.active = true;
				temp.bottomLine.active = false;
			}
			else{
				temp.topLine.active = false;
				temp.leftLine.active = false;
				temp.rightLine.active = false;
				temp.bottomLine.active = false;
			}
			temp = temp.next;
		}
	}
	this.firstPlace = function(){
		var boxSize = 0;
		var boardWidth = 0;
		var boardHeight = 0;
		var adWidth = 0;
		var adHeight = 0;
		var gameWidth = 0;
		var gameHeight = 0;
		var append = "";
		var appendBoxes = "";
		var topBoxesWidth = 0;
		var topBoxexseight = 0;
		if(windowWidth < windowHeight){
			boxSize = windowWidth/((this.size+1)*3+(this.size+2))*5;
			gameWidth = "100%";
			gameHeight = windowWidth;
			boardWidth = "100%";
			boardHeight = ((windowHeight-windowWidth) / 2 ) + "px";
			adWidth = "100%";
			adHeight = boardHeight;
			topBoxesWidth = "33.333%";
			topBoxesHeight = "100%";
		}
		else{
			boxSize = windowHeight/((this.size+1)*3+(this.size+2))*5;
			gameWidth = windowHeight;
			gameHeight = "100%";
			boardWidth = ((windowWidth - windowHeight) / 2) + "px";
			boardHeight = "100%";
			adHeight = "100%";
			adWidth = boardWidth;
			topBoxesWidth = "100%";
			topBoxesHeight = "33.333%";
		}
		var temp = this.root;
		while(temp != undefined){
			if(temp.x == 0 & temp.y == 0){ // sol üst köşe
				appendBoxes = appendBoxes + '<div class="emptyBox" style="position:absolute;z-index:100;background:#fff;width:'+((boxSize/5)*3)+'px;height:'+((boxSize/5)*3)+'px;top:'+(boxSize/5)+'px;left:'+(boxSize/5)+'px;" data-coord="('+temp.x+','+temp.y+')"></div>';
				cssClass = "yanCizgiDeActive cizgi";
				if(temp.topLine.active){
					cssClass = "yanCizgiActive cizgi";
				}
				append = append + '<div class="'+cssClass+'" style="top:0px;left:0px;width:'+boxSize+'px;height:'+(boxSize/5)+'px;border-radius:'+(boxSize/5)+'px" data-cizgiSec="'+temp.x+'-'+temp.y+'_topLine"  onMouseDown="process(this)" onMouseOver="lineOver(this)" onMouseOut="lineOut(this)"></div>';
				
				cssClass = "yanCizgiDeActive cizgi";
				if(temp.bottomLine.active){
					cssClass = "yanCizgiActive cizgi";
				}
				append = append + '<div class="'+cssClass+'" style="top:'+(boxSize/5)*4+'px;left:0px;width:'+boxSize+'px;height:'+(boxSize/5)+'px;border-radius:'+(boxSize/5)+'px" data-cizgiSec="'+temp.x+'-'+temp.y+'_bottomLine" onMouseDown="process(this)" onMouseOver="lineOver(this)" onMouseOut="lineOut(this)"></div>';
				
				cssClass = "dikCizgiDeActive cizgi";
				if(temp.leftLine.active){
					cssClass = "dikCizgiActive cizgi";
				}
				append = append + '<div class="'+cssClass+'" style="top:0px;left:0px;width:'+(boxSize/5)+'px;height:'+boxSize+'px;border-radius:'+(boxSize/5)+'px" data-cizgiSec="'+temp.x+'-'+temp.y+'_leftLine" onMouseDown="process(this)"></div>';
				
				cssClass = "dikCizgiDeActive cizgi";
				if(temp.rightLine.active){
					cssClass = "dikCizgiActive cizgi";
				}
				append = append + '<div class="'+cssClass+'" style="top:0px;left:'+(boxSize/5)*4+'px;width:'+(boxSize/5)+'px;height:'+boxSize+'px;border-radius:'+(boxSize/5)+'px" data-cizgiSec="'+temp.x+'-'+temp.y+'_rightLine" onMouseDown="process(this)" onMouseOver="lineOver(this)" onMouseOut="lineOut(this)"></div>';
			}
			else if(temp.x == 0 & temp.y > 0){ // en sol satır
				appendBoxes = appendBoxes + '<div class="emptyBox" style="position:absolute;z-index:100;background:#fff;width:'+((boxSize/5)*3)+'px;height:'+((boxSize/5)*3)+'px;top:'+((temp.y - 1)*(boxSize/5)*4 + (boxSize/5)*5)+'px;left:'+(boxSize/5)+'px;" data-coord="('+temp.x+','+temp.y+')"></div>';
				cssClass = "yanCizgiDeActive cizgi";
				if(temp.bottomLine.active){
					cssClass = "yanCizgiActive cizgi";
				}
				append = append + '<div class="'+cssClass+'" style="top:'+((temp.y)*(boxSize/5)*4 + (boxSize/5)*4 )+'px;left:0px;width:'+boxSize+'px;height:'+(boxSize/5)+'px;border-radius:'+(boxSize/5)+'px" data-cizgiSec="'+temp.x+'-'+temp.y+'_bottomLine" onMouseDown="process(this)" onMouseOver="lineOver(this)" onMouseOut="lineOut(this)"></div>';
				
				cssClass = "dikCizgiDeActive cizgi";
				if(temp.leftLine.active){
					cssClass = "dikCizgiActive cizgi";
				}
				append = append + '<div class="'+cssClass+'" style="top:'+((temp.y)*(boxSize/5)*4 )+'px;left:0px;width:'+(boxSize/5)+'px;height:'+boxSize+'px;border-radius:'+(boxSize/5)+'px" data-cizgiSec="'+temp.x+'-'+temp.y+'_leftLine" onMouseDown="process(this)" onMouseOver="lineOver(this)" onMouseOut="lineOut(this)"></div>';
				
				cssClass = "dikCizgiDeActive cizgi";
				if(temp.rightLine.active){
					cssClass = "dikCizgiActive cizgi";
				}
				append = append + '<div class="'+cssClass+'" style="top:'+((temp.y)*(boxSize/5)*4 )+'px;left:'+((temp.x+1)*(boxSize/5)*4 )+'px;width:'+(boxSize/5)+'px;height:'+boxSize+'px;border-radius:'+(boxSize/5)+'px" data-cizgiSec="'+temp.x+'-'+temp.y+'_rightLine" onMouseDown="process(this)" onMouseOver="lineOver(this)" onMouseOut="lineOut(this)"></div>';
			}
			else if(temp.x > 0 & temp.y == 0){ // en üst satır
				appendBoxes = appendBoxes + '<div class="emptyBox" style="position:absolute;z-index:100;background:#fff;width:'+((boxSize/5)*3)+'px;height:'+((boxSize/5)*3)+'px;top:'+(boxSize/5)+'px;left:'+((temp.x - 1)*(boxSize/5)*4 + (boxSize/5)*5)+'px;" data-coord="('+temp.x+','+temp.y+')"></div>';
				cssClass = "yanCizgiDeActive cizgi";
				if(temp.topLine.active){
					cssClass = "yanCizgiActive cizgi";
				}
				append = append + '<div class="'+cssClass+'" style="top:0px;left:'+((temp.x)*(boxSize/5)*4  )+'px;width:'+boxSize+'px;height:'+(boxSize/5)+'px;border-radius:'+(boxSize/5)+'px" data-cizgiSec="'+temp.x+'-'+temp.y+'_topLine" onMouseDown="process(this)" onMouseOver="lineOver(this)" onMouseOut="lineOut(this)"></div>';
				
				cssClass = "dikCizgiDeActive cizgi";
				if(temp.rightLine.active){
					cssClass = "dikCizgiActive cizgi";
				}
				append = append + '<div class="'+cssClass+'" style="top:0px;left:'+((temp.x+1)*(boxSize/5)*4 )+'px;width:'+(boxSize/5)+'px;height:'+boxSize+'px;border-radius:'+(boxSize/5)+'px" data-cizgiSec="'+temp.x+'-'+temp.y+'_rightLine" onMouseDown="process(this)" onMouseOver="lineOver(this)" onMouseOut="lineOut(this)"></div>';
				
				cssClass = "yanCizgiDeActive cizgi";
				if(temp.bottomLine.active){
					cssClass = "yanCizgiActive cizgi";
				}
				append = append + '<div class="'+cssClass+'" style="top:'+((temp.y+1)*(boxSize/5)*4)+'px;left:'+((temp.x)*(boxSize/5)*4  )+'px;width:'+boxSize+'px;height:'+(boxSize/5)+'px;border-radius:'+(boxSize/5)+'px" data-cizgiSec="'+temp.x+'-'+temp.y+'_bottomLine" onMouseDown="process(this)" onMouseOver="lineOver(this)" onMouseOut="lineOut(this)"></div>';
			}
			else if(temp.y == this.size & temp.x > 0){ // en alt satır
				appendBoxes = appendBoxes + '<div class="emptyBox" style="position:absolute;z-index:100;background:#fff;width:'+((boxSize/5)*3)+'px;height:'+((boxSize/5)*3)+'px;top:'+((temp.y - 1)*(boxSize/5)*4 + (boxSize/5)*5)+'px;left:'+((temp.x - 1)*(boxSize/5)*4 + (boxSize/5)*5)+'px;" data-coord="('+temp.x+','+temp.y+')"></div>';
				cssClass = "dikCizgiDeActive cizgi";
				if(temp.rightLine.active){
					cssClass = "dikCizgiActive cizgi";
				}
				append = append + '<div class="'+cssClass+'" style="top:'+((temp.y)*(boxSize/5)*4)+'px;left:'+((temp.x+1)*(boxSize/5)*4 )+'px;width:'+(boxSize/5)+'px;height:'+boxSize+'px;border-radius:'+(boxSize/5)+'px" data-cizgiSec="'+temp.x+'-'+temp.y+'_rightLine" onMouseDown="process(this)" onMouseOver="lineOver(this)" onMouseOut="lineOut(this)"></div>';
				
				cssClass = "yanCizgiDeActive cizgi";
				if(temp.bottomLine.active){
					cssClass = "yanCizgiActive cizgi";
				}
				append = append + '<div class="'+cssClass+'" style="top:'+((temp.y+1)*(boxSize/5)*4)+'px;left:'+((temp.x)*(boxSize/5)*4  )+'px;width:'+boxSize+'px;height:'+(boxSize/5)+'px;border-radius:'+(boxSize/5)+'px" data-cizgiSec="'+temp.x+'-'+temp.y+'_bottomLine" onMouseDown="process(this)" onMouseOver="lineOver(this)" onMouseOut="lineOut(this)"></div>';
				
			}
			else if(temp.x == this.size & temp.y > 0){// en sağ satır
				appendBoxes = appendBoxes + '<div class="emptyBox" style="position:absolute;z-index:100;background:#fff;width:'+((boxSize/5)*3)+'px;height:'+((boxSize/5)*3)+'px;top:'+((temp.y - 1)*(boxSize/5)*4 + (boxSize/5)*5)+'px;left:'+((temp.x - 1)*(boxSize/5)*4 + (boxSize/5)*5)+'px;" data-coord="('+temp.x+','+temp.y+')"></div>';
				cssClass = "yanCizgiDeActive cizgi";
				if(temp.bottomLine.active){
					cssClass = "yanCizgiActive cizgi";
				}
				append = append + '<div class="'+cssClass+'" style="top:'+((temp.y+1)*(boxSize/5)*4)+'px;left:'+((temp.x)*(boxSize/5)*4  )+'px;width:'+boxSize+'px;height:'+(boxSize/5)+'px;border-radius:'+(boxSize/5)+'px" data-cizgiSec="'+temp.x+'-'+temp.y+'_bottomLine" onMouseDown="process(this)" onMouseOver="lineOver(this)" onMouseOut="lineOut(this)"></div>';
				
				cssClass = "dikCizgiDeActive cizgi";
				if(temp.rightLine.active){
					cssClass = "dikCizgiActive cizgi";
				}
				append = append + '<div class="'+cssClass+'" style="top:'+((temp.y)*(boxSize/5)*4)+'px;left:'+((temp.x+1)*(boxSize/5)*4 )+'px;width:'+(boxSize/5)+'px;height:'+boxSize+'px;border-radius:'+(boxSize/5)+'px" data-cizgiSec="'+temp.x+'-'+temp.y+'_rightLine" onMouseDown="process(this)" onMouseOver="lineOver(this)" onMouseOut="lineOut(this)"></div>';
			}
			else{
				appendBoxes = appendBoxes + '<div class="emptyBox" style="position:absolute;z-index:100;background:#fff;width:'+((boxSize/5)*3)+'px;height:'+((boxSize/5)*3)+'px;top:'+((temp.y - 1)*(boxSize/5)*4 + (boxSize/5)*5)+'px;left:'+((temp.x - 1)*(boxSize/5)*4 + (boxSize/5)*5)+'px;" data-coord="('+temp.x+','+temp.y+')"></div>';
				cssClass = "yanCizgiDeActive cizgi";
				if(temp.bottomLine.active){
					cssClass = "yanCizgiActive cizgi";
				}
				append = append + '<div class="'+cssClass+'" style="top:'+((temp.y+1)*(boxSize/5)*4)+'px;left:'+((temp.x)*(boxSize/5)*4  )+'px;width:'+boxSize+'px;height:'+(boxSize/5)+'px;border-radius:'+(boxSize/5)+'px" data-cizgiSec="'+temp.x+'-'+temp.y+'_bottomLine" onMouseDown="process(this)" onMouseOver="lineOver(this)" onMouseOut="lineOut(this)"></div>';
				
				cssClass = "dikCizgiDeActive cizgi";
				if(temp.rightLine.active){
					cssClass = "dikCizgiActive cizgi";
				}
				append = append + '<div class="'+cssClass+'" style="top:'+((temp.y)*(boxSize/5)*4)+'px;left:'+((temp.x+1)*(boxSize/5)*4 )+'px;width:'+(boxSize/5)+'px;height:'+boxSize+'px;border-radius:'+(boxSize/5)+'px" data-cizgiSec="'+temp.x+'-'+temp.y+'_rightLine" onMouseDown="process(this)" onMouseOver="lineOver(this)" onMouseOut="lineOut(this)"></div>';
			}
			temp = temp.next;
		}
		$(document).ready(function(){
			$(".board").css({
				"width":boardWidth,
				"height":boardHeight,
				"background":"#99ffff",
				"display":"block"
			});
			$(".ad").css({
				"width":adWidth,
				"height":adHeight,
				"background":"#fff",
				"display":"block"
			});
			$(".game").css({
				"width":gameWidth,
				"height":gameHeight,
				"display":"block"
			});
			$(".sira").css({"width":topBoxesWidth,"height":topBoxesHeight,"float":"left"});
			$(".user1").css({"width":topBoxesWidth,"height":topBoxesHeight,"float":"left"});
			$(".user2").css({"width":topBoxesWidth,"height":topBoxesHeight,"float":"left"});
			$(".game").html(append);
			$(".game").append(appendBoxes);
		});
	}
	this.get = function(x,y){
		var temp = this.root;
		while(temp != undefined){
			if(temp.x == x && temp.y == y){
				return temp;
			}
			temp = temp.next;
		}
		return undefined;
	}
}
$(document).ready(function(){
	$(".anyMenu:eq(1)").show();
	$(".play-with-friend button").css("height",windowHeight*0.1+"px");
	$(".multi-play").click(function(){
		$(".anyMenu").hide();
		$(".anyMenu:eq(2)").show();
	});
	$(".quick-play").click(function(){
		$(".anyMenu").hide();
		$(".anyMenu:eq(3)").show();
	});
	$(".hakkinda").click(function(){
		$(".anyMenu").hide();
		$(".anyMenu:eq(4)").show();
	});
	$(".arkadasinlaOynaYeniOlustur").click(function(){
		createGame({"size":$(".birim1").val(),"user1":"1. Oyuncu","user2":"2. Oyuncu","user1Score":0,"user2Score":0,"sira":1},false);
	});
	$(".playRandom").click(function(){
		createGame({"size":$(".birim2").val(),"user1":"1. Oyuncu","user2":"Bilgisayar","user1Score":0,"user2Score":0,"sira":1},true);
	});
	$(".anaMenuyeDon").click(function(){
		$(".anyMenu").hide();
		$(".anyMenu:eq(1)").show();
	});
	$(".turn-online").click(function(){
		Android.Toast("Online Moda Geçiliyor");
		window.location="http://kareyap.herokuapp.com/";
	});
});
var game = undefined;
function createGame(data,user2IsRobot){
	game = new bl();
	game.user2IsRobot = user2IsRobot;
	game.user1 = data.user1;
	game.user2 = data.user2;
	game.set(data.size);
	game.create();
	game.first();
	game.firstPlace();
	$(".board").show();
	$(".game").show();
	$(".ad").show();
	$(document).ready(function(){
		$(".anyMenu").hide();
		$(".user1").html(data.user1+ " : "+data.user1Score);
		$(".user2").html(data.user2+ " : "+data.user2Score);
		if(data.sira == 1){
			$(".sira").html("Sıra <b>"+data.user1+ "</b> nun");
		}
		else if(data.sira == 2){
			$(".sira").html("Sıra <b>"+data.user2+ "</b> nun");
		}
	});
}
function updateGame(data){
	$(document).ready(function(){
		if(data.change){
			$(".user1").html(data.user1+ " : "+data.user1Score);
			$(".user2").html(data.user2+ " : "+data.user2Score);
			if(data.sira == 1){
				$(".sira").html("Sıra <b>"+data.user1+ "</b> nun");
			}
			else if(data.sira == 2){
				$(".sira").html("Sıra <b>"+data.user2+ "</b> nun");
			}
			signLine(data.x,data.y,data.direction);
			for(var i=0;i<data.scoredXy.length;i++){
				if(data.scoredXy[i] != null & data.scoredXy[i] != undefined ){
					if(data.sira == 1){
						$(".emptyBox[data-coord='("+data.scoredXy[i].x+","+data.scoredXy[i].y+")']").css("background","#f03236");
					}
					else{
						$(".emptyBox[data-coord='("+data.scoredXy[i].x+","+data.scoredXy[i].y+")']").css("background","#68b5f0");
					}
				}
			}
		}
	});
	var player = document.getElementById("notification");
	if(data.yourTurn){
		player.play();
		player.duration = 0;
		/*if(Android != null & Android != undefined){
			Android.playSound();
		}*/
	}
}
function signLine(x,y,direction){
	$(document).ready(function(){
		if(direction == "bottomLine"){
			var cizgi = $(".yanCizgiDeActive[data-cizgiSec='"+x+"-"+y+"_bottomLine']");
			var counter = 0;
			var animate = setInterval(function(){
				if(counter % 2  == 0){
					cizgi.addClass("momentaryActive");
					cizgi.removeClass("momentaryDeactive");
				}
				else{
					cizgi.addClass("momentaryDeactive");
					cizgi.removeClass("momentaryActive");
				}
				counter++;
				if(counter == 10){
					clearInterval(animate);
					cizgi.removeClass("momentaryDeactive");
					cizgi.removeClass("momentaryActive");
				}
			},75);
			cizgi.removeClass("yanCizgiDeActive");
			cizgi.addClass("yanCizgiActive");
			cizgi.removeClass("lineOver");
			cizgi.removeClass("lineOut");
		}
		else if(direction == "rightLine"){
			var cizgi = $(".dikCizgiDeActive[data-cizgiSec='"+x+"-"+y+"_rightLine']");
			var counter = 0;
			var animate = setInterval(function(){
				if(counter % 2  == 0){
					cizgi.addClass("momentaryActive");
					cizgi.removeClass("momentaryDeactive");
				}
				else{
					cizgi.addClass("momentaryDeactive");
					cizgi.removeClass("momentaryActive");
				}
				counter++;
				if(counter == 10){
					clearInterval(animate);
					cizgi.removeClass("momentaryDeactive");
					cizgi.removeClass("momentaryActive");
				}
			},75);
			cizgi.removeClass("dikCizgiDeActive");
			cizgi.addClass("dikCizgiActive");
			cizgi.removeClass("lineOver");
			cizgi.removeClass("lineOut");
		}
	});
}

function gameFinished(data){
	if(data.winner != 0){
		$(".gameOver").html("Oyun bitti. Kazanan : <b>"+data.winner+"</b>");
	}
	else{
		$(".gameOver").html("Oyun <b>berabere</b> bitti.");
	}
	$(".gameOver").append('<br /><button class="anaMenuyeDon" onClick="anaMenuyeDon()">Ana Menüye Dön</button>');
	$(".gameOver").show();
}
function anaMenuyeDon(){
	$(".board").hide();
	$(".game").hide();
	$(".ad").hide();
	$(".gameOver").hide();
	$(".anyMenu:eq(1)").show();
}
function process(line){
	$(document).ready(function(){
		var secici = $(line).attr("data-cizgiSec");
		var xString = "";
		var yString = "";
		var direction = "";
		var i = 0;
		while(i<secici.length){
			if(secici.charAt(i) != "-"){
				xString = xString + secici.charAt(i);
			}
			else{
				i++;
				break;
			}
			i++;
		}
		while(i<secici.length){
			if(secici.charAt(i) != "_"){
				yString = yString + secici.charAt(i);
			}
			else{
				i++;
				break;
			}
			i++;
		}
		while(i<secici.length){
			if(secici.charAt(i) != undefined){
				direction = direction + secici.charAt(i);
			}
			else{
				i++;
				break;
			}
			i++;
		}
		var x = parseInt(xString);
		var y = parseInt(yString);
		if(game.sira ==  2 && game.user2IsRobot == true){
			
		}
		else{
			processing({"x":x,"y":y,"direction":direction});
		}
	});
}
function processing(data){
	var x = data.x;
	var y = data.y;
	var direction = data.direction;
	if(direction == "topLine"){
		direction = "bottomLine";
		y--;
	}
	else if(direction == "leftLine"){
		direction = "rightLine";
		x--;
	}
	var sira = game.sira;
	var scoreControl = 0;
	var scoredXy = new Array();
	if(x < 0 | y < 0 | x > game.size + 1 | y > game.size + 1){
		return false;
	}
	var getNode = game.get(x,y);
	if(direction == "rightLine"){
		if(!getNode.rightLine.active){
			game.get(x,y).rightLine.active = true;
			if(y < game.size + 1){
				game.get(x+1,y).leftLine.active = true;
			}
			scoreControl = 1;
		}
	}
	else if(direction == "bottomLine"){
		if(!getNode.bottomLine.active){
			game.get(x,y).bottomLine.active = true;
			if(x < game.size + 1){
				game.get(x,y+1).topLine.active = true;
			}
			scoreControl = 1;
		}
	}
	var addScore = 0;
	if(scoreControl > 0){
		if(direction == "rightLine"){
			var getNode = game.get(x,y);
			if(getNode.topLine.active &
				getNode.rightLine.active &
					getNode.bottomLine.active &
						getNode.leftLine.active){
							addScore++;
							scoredXy[0] = {"x":x,"y":y};
						}
			if(x < game.size + 1){
				getNode = game.get(x+1,y);
				if(getNode.topLine.active &
					getNode.rightLine.active &
						getNode.bottomLine.active &
							getNode.leftLine.active){
								addScore++;
								scoredXy[1] = {"x":x+1,"y":y};
							}
			}
		}
		else if(direction == "bottomLine"){
			var getNode = game.get(x,y);
			if(getNode.topLine.active &
				getNode.rightLine.active &
					getNode.bottomLine.active &
						getNode.leftLine.active){
							addScore++;
							scoredXy[0] = {"x":x,"y":y};
						}
			if(y < game.size + 1){
				getNode = game.get(x,y+1);
				if(getNode.topLine.active &
					getNode.rightLine.active &
						getNode.bottomLine.active &
							getNode.leftLine.active){
								addScore++;
								scoredXy[1] = {"x":x,"y":y+1};
							}
			}
		}
		if(addScore > 0){
			if(game.sira == 1){
				game.user1Score += addScore;
			}
			else{
				game.user2Score += addScore;
			}
			updateGame({"user1":game.user1,"user2":game.user2,"user1Score":game.user1Score,"user2Score":game.user2Score,"sira":game.sira,"x":x,"y":y,"direction":direction,"change":true,"scoredXy":scoredXy,"yourTurn":true});
		}
		else{
			if(game.sira == 1){
				game.sira = 2;
				updateGame({"user1":game.user1,"user2":game.user2,"user1Score":game.user1Score,"user2Score":game.user2Score,"sira":game.sira,"x":x,"y":y,"direction":direction,"change":true,"scoredXy":scoredXy,"yourTurn":true});
			}
			else{
				game.sira = 1;
				updateGame({"user1":game.user1,"user2":game.user2,"user1Score":game.user1Score,"user2Score":game.user2Score,"sira":game.sira,"x":x,"y":y,"direction":direction,"change":true,"scoredXy":scoredXy,"yourTurn":true});
			}
		}
		if((game.user1Score + game.user2Score) == (game.size + 1) * (game.size + 1)){
			if(game.user1Score > game.user2Score){
				gameFinished({"winner":game.user1});
			}
			else if(game.user1Score < game.user2Score){
				gameFinished({"winner":game.user2});
			}
			else{
				gameFinished({"winner":0});
			}
		}
	}
	else{
		updateGame({"user1":game.user1,"user2":game.user2,"user1Score":game.user1Score,"user2Score":game.user2Score,"sira":game.sira,"x":x,"y":y,"direction":direction,"change":true,"scoredXy":scoredXy,"yourTurn":true});
	}
	if(game.sira == 2 & game.user2IsRobot == true){
		playComputer();
	}
}
function playComputer(){
	selectLine(1);
}
function selectLine(count){
	if(game.user2IsRobot != true | game.sira != 2){
		return false;
	}
	var played = false;
	var temp = game.root;
	while(temp != undefined & played == false){
		var signedLineCount = 0;
		var unsignedLine = "";
		if(temp.topLine.active){
			signedLineCount++;
		}
		else{
			unsignedLine = "topLine";
		}
		if(temp.rightLine.active){
			signedLineCount++;
		}
		else{
			unsignedLine = "rightLine";
		}
		if(temp.bottomLine.active){
			signedLineCount++;
		}
		else{
			unsignedLine = "bottomLine";
		}
		if(temp.leftLine.active){
			signedLineCount++;
		}
		else{
			unsignedLine = "leftLine";
		}
		var x = temp.x;
		var y = temp.y;
		if(signedLineCount == 3){
			processing({"x":x,"y":y,"direction":unsignedLine});
			return selectLine(count);
		}
		temp = temp.next;
	}
	if(count >= game.size + 1){
		var temp = game.root;
		while(temp != undefined){
			var x = temp.x;
			var y = temp.y;
			var unsignedLines = new Array();
			var line = game.get(x,y);
			if(line.topLine.active){}else{unsignedLines.push("topLine");}
			if(line.rightLine.active){}else{unsignedLines.push("rightLine");}
			if(line.bottomLine.active){}else{unsignedLines.push("bottomLine");}
			if(line.leftLine.active){}else{unsignedLines.push("leftLine");}
			if(unsignedLines.length >= 3){
				var direction = unsignedLines[Math.floor(Math.random() * unsignedLines.length)];
				if(direction == "topLine"){
					var newY = y-1;
					var newLine = game.get(x,newY);
				}
				if(direction == "rightLine"){
					var newX = x+1;
					var newLine = game.get(newX,y);
				}
				if(direction == "bottomLine"){
					var newY = y+1;
					var newLine = game.get(x,newY);
				}
				if(direction == "leftLine"){
					var newX = x-1;
					var newLine = game.get(newX,y);
				}
				var newUnsignedLines = new Array();
				if(newLine.topLine.active){}else{newUnsignedLines.push("topLine");}
				if(newLine.rightLine.active){}else{newUnsignedLines.push("rightLine");}
				if(newLine.bottomLine.active){}else{newUnsignedLines.push("bottomLine");}
				if(newLine.leftLine.active){}else{newUnsignedLines.push("leftLine");}
				if(newUnsignedLines.length >=3){
					processing({"x":x,"y":y,"direction":direction});
					played = true;
					break;
				}
			}
			temp = temp.next;
		}
	}
	else{
		var x = Math.floor(Math.random() * (game.size + 1));
		var y = Math.floor(Math.random() * (game.size + 1));
		var unsignedLines = new Array();
		var line = game.get(x,y);
		if(line.topLine.active){}else{unsignedLines.push("topLine");}
		if(line.rightLine.active){}else{unsignedLines.push("rightLine");}
		if(line.bottomLine.active){}else{unsignedLines.push("bottomLine");}
		if(line.leftLine.active){}else{unsignedLines.push("leftLine");}
		if(unsignedLines.length >= 3){
			var direction = unsignedLines[Math.floor(Math.random() * unsignedLines.length)];
			if(direction == "topLine"){
				var newY = y-1;
				var newLine = game.get(x,newY);
			}
			if(direction == "rightLine"){
				var newX = x+1;
				var newLine = game.get(newX,y);
			}
			if(direction == "bottomLine"){
				var newY = y+1;
				var newLine = game.get(x,newY);
			}
			if(direction == "leftLine"){
				var newX = x-1;
				var newLine = game.get(newX,y);
			}
			var newUnsignedLines = new Array();
			if(newLine.topLine.active){}else{newUnsignedLines.push("topLine");}
			if(newLine.rightLine.active){}else{newUnsignedLines.push("rightLine");}
			if(newLine.bottomLine.active){}else{newUnsignedLines.push("bottomLine");}
			if(newLine.leftLine.active){}else{newUnsignedLines.push("leftLine");}
			if(newUnsignedLines.length >=3){
				processing({"x":x,"y":y,"direction":direction});
				played = true;
			}
			else{
				return selectLine(count + 1);
			}
		}
		else{
			return selectLine(count + 1);
		}
	}
	if(played == false){
		var temp = game.root;
		while(temp != undefined){
			var x = temp.x;
			var y = temp.y;
			var unsignedLines = new Array();
			var line = game.get(x,y);
			if(line.topLine.active){}else{unsignedLines.push("topLine");}
			if(line.rightLine.active){}else{unsignedLines.push("rightLine");}
			if(line.bottomLine.active){}else{unsignedLines.push("bottomLine");}
			if(line.leftLine.active){}else{unsignedLines.push("leftLine");}
			if(unsignedLines.length == 2){
				var direction = unsignedLines[Math.floor(Math.random() * unsignedLines.length)];
				processing({"x":x,"y":y,"direction":direction});
				played = true;
				break;
			}
			temp = temp.next;
		}
	}
}
function lineOver(){}
function lineOut(){}
