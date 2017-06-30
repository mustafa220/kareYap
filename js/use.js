var socket = io.connect();
var firstLogin = false;
var logined = false;
var windowWidth = $(window).width();
var windowHeight = $(window).height();
if(!firstLogin){
	$(document).ready(function(){
		$(".firstLogin").show();
		$(".loginButton").click(function(){
			socket.emit("login",{"username":$(".inputUserName").val()});
		});
	});
}
socket.on("login",function(data){
	if(data.code == 0){
		$(document).ready(function(){
			$(".firstLogin").hide();
			$(".anaMenu").show();
			$(".showUserName").html("Hoşgeldiniz " + data.username);
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
			$(".sira").css({"width":topBoxesWidth,"height":topBoxesHeight});
			$(".user1").css({"width":topBoxesWidth,"height":topBoxesHeight});
			$(".user2").css({"width":topBoxesWidth,"height":topBoxesHeight});
			$(".game").html(append);
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
	$(".arkadasinlaOyna").click(function(){
		$(".anaMenu:eq(0)").hide();
		$(".arkadasinlaOynaMenu").show();
	});
	$(".arkadasinlaOynaYeniOlustur").click(function(){
		socket.emit("createNewGameFriend",{"size":$(".birim1").val()});
	});
	$(".arkadasinlaOynaYeniOyunaKatil").click(function(){
		var code = $(".loginGameCode").val();
		socket.emit("loginRequest",{"code":code});
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
		$(".arkadasinlaOynaMenu").hide();
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
			if(data.direction == "bottomLine"){
				var cizgi = $(".yanCizgiDeActive[data-cizgiSec='"+data.x+"-"+data.y+"_bottomLine']");
				cizgi.removeClass("yanCizgiDeActive");
				cizgi.addClass("yanCizgiActive");
			}
			else if(data.direction == "rightLine"){
				var cizgi = $(".dikCizgiDeActive[data-cizgiSec='"+data.x+"-"+data.y+"_rightLine']");
				cizgi.removeClass("dikCizgiDeActive");
				cizgi.addClass("dikCizgiActive");
			}
			$(cizgi).removeClass("lineOver");
			$(cizgi).removeClass("lineOut");
		}
	});
});
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
	$(".anaMenu").show();
	$(".arkadasinlaOynaMenu").hide();
	$(".rastgeleOynaMenu").hide();
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
$(document).ready(function(){
	
});