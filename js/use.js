var socket = io.connect();
var firstLogin = false;
var logined = false;
var windowWidth = $(window).width();
var windowHeight = $(window).height();
/*$(window).resize(function() {
	windowWidth = $(window).width();
	windowHeight = $(window).height();
	$(document).ready(function(){
		boxSize = windowWidth/((this.size+1)*3+(this.size+2))*5;
		gameWidth = "100%";
		gameHeight = windowWidth;
		boardWidth = "100%";
		boardHeight = ((windowHeight-windowWidth) / 2 ) + "px";
		adWidth = "100%";
		adHeight = boardHeight;
		topBoxesWidth = "33.333%";
		topBoxesHeight = "100%";
		$(".dikCizgiActive").css({"width":(boxSize/5)+"px","height":boxSize+"px"});
		$(".dikCizgiDeActive").css({"width":(boxSize/5)+"px","height":boxSize+"px"});
		$(".yanCizgiActive").css({"width":boxSize+"px","height":(boxSize/5)+"px"});
		$(".yanCizgiDeActive").css({"width":boxSize+"px","height":(boxSize/5)+"px"});
		$(".emptyBox").css({"width":((boxSize/5)*3)+"px","height":((boxSize/5)*3)+"px"});
	});
});      */
/*
	anyMenu
		0 : loginFrm
		1 : mainScreen
		2 : playWithFriend
		3 : playWithQuick
		4 : about
*/
if(!firstLogin){
	$(document).ready(function(){
		$(".login-form").show();
		$(".loginButton").click(function(){
			socket.emit("login",{"username":$(".inputUserName").val()});
		});
	});
}
socket.on("alert",function(data){
	alert(data.message);
});
socket.on("login",function(data){
	if(data.code == 0){
		$(document).ready(function(){
			$(".anyMenu").hide();
			$(".anyMenu:eq(1)").show();
			$(".user-name").html("Hoşgeldiniz " + data.username);
			logined = true;
		});
	}
	else if(data.code == 1){
		alert("Giriş hatalı. Başka bir kullanıcı adı deneyin.");
	}
	else{
		alert("Server bakımda");
	}
});
var node = function(){
	this.top = undefined;
	this.right = undefined;
	this.left = undefined;
	this.bottom = undefined;
	this.next = undefined;
	this.topLine = {"active":false};
	this.rightLine = {"active":false};
	this.leftLine = {"active":false};
	this.bottomLine = {"active":false};
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
	$(".play-with-friend button").css("height",windowHeight*0.1+"px");
	$(".multi-play").click(function(){
		$(".anyMenu").hide();
		$(".anyMenu:eq(2)").show();
	});
	$(".quick-play").click(function(){
		$(".anyMenu").hide();
		$(".anyMenu:eq(3)").show();
		socket.emit("playRandom",{});
	});
	$(".hakkinda").click(function(){
		$(".anyMenu").hide();
		$(".anyMenu:eq(4)").show();
	});
	$(".arkadasinlaOynaYeniOlustur").click(function(){
		socket.emit("createNewGameFriend",{"size":$(".birim1").val()});
	});
	$(".arkadasinlaOynaYeniOyunaKatil").click(function(){
		var code = $(".loginGameCode").val();
		socket.emit("loginRequest",{"code":code});
	});
	$(".anaMenuyeDon").click(function(){
		$(".anyMenu").hide();
		$(".anyMenu:eq(1)").show();
	});
});
socket.on("waitFor",function(data){
	$(document).ready(function(){
		var code = data.code;
		$(".createdCode").val(code);
		alert("Oyun oluşturuldu. Rakibin katıldığında oyun başlayacak");
	});
});
socket.on("createGame",function(data){
	var game = new bl();
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
			$(".sira").html("Sıra <b>"+data.user1+ "</b> adlı kullanıcının");
		}
		else if(data.sira == 2){
			$(".sira").html("Sıra <b>"+data.user2+ "</b> adlı kullanıcının");
		}
	});
});
socket.on("updateGame",function(data){
	$(document).ready(function(){
		if(data.change){
			$(".user1").html(data.user1+ " : "+data.user1Score);
			$(".user2").html(data.user2+ " : "+data.user2Score);
			if(data.sira == 1){
				$(".sira").html("Sıra <b>"+data.user1+ "</b> adlı kullanıcının");
			}
			else if(data.sira == 2){
				$(".sira").html("Sıra <b>"+data.user2+ "</b> adlı kullanıcının");
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
		if(Android != null & Android != undefined){
			Android.playSound();
		}
	}
});
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
socket.on("lineOvered",function(data){
	var x = data.x;
	var y = data.y;
	var direction = data.direction;
	if(direction == "rightLine" | direction == "bottomLine"){
		var line = $(".cizgi[data-cizgiSec='"+x+"-"+y+"_"+direction+"']");
		$(line).addClass("lineOver");
		$(line).removeClass("lineOut");
	}
});
socket.on("lineOuted",function(data){
	var x = data.x;
	var y = data.y;
	var direction = data.direction;
	if(direction == "rightLine" | direction == "bottomLine"){
		var line = $(".cizgi[data-cizgiSec='"+x+"-"+y+"_"+direction+"']");
		$(line).removeClass("lineOver");
		$(line).addClass("lineOut");
	}
});
socket.on("gameFinished",function(data){
	if(data.winner != 0){
		$(".gameOver").html("Oyun bitti. Kazanan : <b>"+data.winner+"</b>");
	}
	else{
		$(".gameOver").html("Oyun <b>berabere</b> bitti.");
	}
	$(".gameOver").append('<br /><button class="anaMenuyeDon" onClick="anaMenuyeDon()">Ana Menüye Dön</button>');
	$(".gameOver").show();
});
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
		socket.emit("process",{"x":x,"y":y,"direction":direction});
	});
}
function lineOver(line){
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
		socket.emit("lineOver",{"x":x,"y":y,"direction":direction});
	});
}
function lineOut(line){
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
		socket.emit("lineOut",{"x":x,"y":y,"direction":direction});
	});
}