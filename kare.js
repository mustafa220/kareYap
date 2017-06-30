var express = require("express");
var md5 = require("md5");
var app = express();

app.use("/js",express.static(__dirname+"/js"));
app.use("/css",express.static(__dirname+"/css"));
app.use("/pages",express.static(__dirname+"/pages"));

var server = app.listen(85);
console.log("listening on port 85");
var roomNode = function(){
	this.code = undefined;
	this.user1 = undefined;
	this.user2 = undefined;
	this.game = undefined;
	this.size = undefined;
	this.user1Score = 0;
	this.user2Score = 0;
	this.finished = false;
	this.sira = 1;
	this.next = undefined;
}
var roomBl = function(){
	this.root = undefined;
	this.last = undefined;
	this.insert = function(username,size,code){
		var newNode = new roomNode();
		if(this.root == undefined){
			this.root = newNode;
			this.last = newNode;
		}
		else{
			this.last.next = newNode;
			this.last = newNode;
		}
		newNode.user1 = username;
		newNode.size = size;
		newNode.code = code;
	}
	this.getFromCode = function(code){
		var temp = this.root;
		while(temp != undefined){
			if(temp.code == code){
				return temp;
			}
			temp = temp.next;
		}
	}
	this.getFromUsername = function(username){
		var temp = this.root;
		while(temp != undefined){
			if(temp.user1 == username || temp.user2 == username){
				return temp;
			}
			temp = temp.next;
		}
	}
	this.deleteFromUsername = function(username){
		var temp = this.root;
		if(temp != undefined){
			
			if(this.root.user1 == username | this.root.user2 == username){
				this.root = this.root.next;
			}
			else{
				prev = temp;
				temp = temp.next;
				while(temp != undefined){
					if(temp.user1 == username){
						if(this.last.user1 == temp.username){
							this.last = prev;
							prev.next = undefined;
						}
						else{
							prev.next = temp.next;
						}
						break;
						
					}
					else if(temp.user2 == username){
						if(this.last.user2 == temp.username){
							this.last = prev;
							prev.next = undefined;
						}
						else{
							prev.next = temp.next;
						}
						break;
					}
					else{
						prev = temp;
						temp = temp.next;
					}
				}
			}
		}
		
	}
}
var userNode = function(username,socketId){
	this.username = username;
	this.socketId = socketId;
	this.next = undefined;
}
var userBl = function(){
	this.root = undefined;
	this.last = undefined;
	this.insert = function(username,socketId){
		if(this.getFromUsername(username) || this.getFromSocketId(socketId)){
			return false;
		}
		var newNode = new userNode(username,socketId);
		if(this.root == undefined){
			this.root = newNode;
			this.last = newNode;
		}
		else{
			this.last.next = newNode;
			this.last = newNode;
		}
	}
	this.getFromUsername = function(username){
		var temp = this.root;
		while(temp != undefined){
			if(temp.username == username){
				return temp;
			}
			temp = temp.next;
		}
		return false;
	}
	this.getFromSocketId = function(socketId){
		var temp = this.root;
		while(temp != undefined){
			if(temp.socketId == socketId){
				return temp;
			}
			temp = temp.next;
		}
		return false;
	}
	this.deleteFromUsername = function(username){
		var temp = this.root;
		if(temp != undefined){
			if(this.root.username == username){
				this.root = this.root.next;
			}
			else{
				prev = temp;
				temp = temp.next;
				while(temp != undefined){
					if(temp.username == username){
						if(this.last.username == temp.username){
							this.last = prev;
							prev.next = undefined;
						}
						else{
							prev.next = temp.next;
						}
						break;
					}
					else{
						prev = temp;
						temp = temp.next;
					}
				}
			}
		}
	}
	this.deleteFromSocketId = function(socketId){
		var temp = this.root;
		if(temp != undefined){
			if(this.root.socketId == socketId){
				this.root = this.root.next;
			}
			else{
				prev = temp;
				temp = temp.next;
				while(temp != undefined){
					if(temp.socketId == socketId){
						if(this.last.socketId == temp.socketId){
							this.last = prev;
							prev.next = undefined;
						}
						else{
							prev.next = temp.next;
						}
						break;
					}
					else{
						prev = temp;
						temp = temp.next;
					}
				}
			}
		}
	}
}
var line = function(){
	this.active = false;
}
var node = function(){
	this.top = undefined;
	this.right = undefined;
	this.left = undefined;
	this.bottom = undefined;
	this.next = undefined;
	this.topLine = new line();
	this.rightLine = new line();
	this.leftLine = new line();
	this.bottomLine = new line();
	this.next = undefined;
	this.x = 0;
	this.y = 0;
}
var bl = function(){
	this.size = 2;
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
function createNewCode(uzunluk) {
	maske = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	var sonuc = '';
	for (var i = uzunluk; i > 0; --i){
		sonuc += maske[Math.floor(Math.random() * maske.length)];
	}
	if(rooms.getFromCode(sonuc) != undefined){
		return createNewCode(uzunluk);
	}
	return sonuc;
}
var io = require("socket.io").listen(server);
var users = new userBl();
var rooms = new roomBl();
io.sockets.on("connection",function(socket){
	socket.on("login",function(data){
		var username = data.username;
		var socketId = socket.id;
		if(users.getFromUsername(username) || users.getFromSocketId(socketId)){
			io.to(socketId).emit("login",{"code":1});
		}
		else{
			users.insert(username,socketId);
			io.to(socketId).emit("login",{"code":0,"username":username});
		}
	});
	socket.on("createNewGameFriend",function(data){
		socketId = socket.id;
		var user = users.getFromSocketId(socketId);
		var newRoomCode = createNewCode(3);
		rooms.insert(user.username,data.size,newRoomCode);
		var room = rooms.getFromCode(newRoomCode);
		var game = new bl();
		game.set(data.size);
		game.create();
		game.first();
		room.game = game;
		io.to(socketId).emit("waitFor",{"code":newRoomCode});
	});
	socket.on("loginRequest",function(data){
		socketId = socket.id;
		var user = users.getFromSocketId(socketId);
		var room = rooms.getFromCode(data.code);
		if(room != undefined && room.user2 == undefined){
			room.user2 = user.username;
			io.to(users.getFromUsername(room.user1).socketId).emit("createGame",{"size":room.size,"user1":room.user1,"user2":room.user2,"user1Score":room.user1Score,"user2Score":room.user2Score,"sira":room.sira});
			io.to(users.getFromUsername(room.user2).socketId).emit("createGame",{"size":room.size,"user1":room.user1,"user2":room.user2,"user1Score":room.user1Score,"user2Score":room.user2Score,"sira":room.sira});
		}
	});
	socket.on("process",function(data){
		var x = data.x;
		var y = data.y;
		var direction = data.direction;
		var socketId = socket.id;
		var user = users.getFromSocketId(socketId);
		if(user == undefined){
			return false;
		}
		var room = rooms.getFromUsername(user.username);
		if(room == undefined){
			return false;
		}
		var game = room.game;
		var sira = room.sira;
		if(sira == 1){
			var controlUser = room.user1;
		}
		else{
			var controlUser = room.user2;
		}
		var scoreControl = 0;
		if(user.username == controlUser){
			var getNode = game.get(x,y);
			if(direction == "rightLine"){
				if(!getNode.rightLine.active){
					game.get(x,y).rightLine.active = true;
					if(y < room.size){
						game.get(x+1,y).leftLine.active = true;
					}
					scoreControl = 1;
				}
			}
			else if(direction == "bottomLine"){
				if(!getNode.bottomLine.active){
					game.get(x,y).bottomLine.active = true;
					if(x < room.size){
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
								}
					if(y < room.size){
						getNode = game.get(x+1,y);
						if(getNode.topLine.active &
							getNode.rightLine.active &
								getNode.bottomLine.active &
									getNode.leftLine.active){
										addScore++;
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
								}
					if(x < room.size){
						getNode = game.get(x,y+1);
						if(getNode.topLine.active &
							getNode.rightLine.active &
								getNode.bottomLine.active &
									getNode.leftLine.active){
										addScore++;
									}
					}
				}
				if(addScore > 0){
					if(room.sira == 1){
						room.user1Score += addScore;
					}
					else{
						room.user2Score += addScore;
					}
					io.to(users.getFromUsername(room.user1).socketId).emit("updateGame",{"user1":room.user1,"user2":room.user2,"user1Score":room.user1Score,"user2Score":room.user2Score,"sira":room.sira,"x":x,"y":y,"direction":direction,"change":true,"siraChange":false});
					io.to(users.getFromUsername(room.user2).socketId).emit("updateGame",{"user1":room.user1,"user2":room.user2,"user1Score":room.user1Score,"user2Score":room.user2Score,"sira":room.sira,"x":x,"y":y,"direction":direction,"change":true,"siraChange":false});
				}
				else{
					if(room.sira == 1){
						room.sira = 2;
					}
					else{
						room.sira = 1;
					}
					io.to(users.getFromUsername(room.user1).socketId).emit("updateGame",{"user1":room.user1,"user2":room.user2,"user1Score":room.user1Score,"user2Score":room.user2Score,"sira":room.sira,"x":x,"y":y,"direction":direction,"change":true,"siraChange":true});
					io.to(users.getFromUsername(room.user2).socketId).emit("updateGame",{"user1":room.user1,"user2":room.user2,"user1Score":room.user1Score,"user2Score":room.user2Score,"sira":room.sira,"x":x,"y":y,"direction":direction,"change":true,"siraChange":true});
				}
				if((room.user1Score + room.user2Score) == room.size * room.size){
					rooms.deleteFromUsername(room.user1);
					if(room.user1Score > room.user2Score){
						io.to(users.getFromUsername(room.user1).socketId).emit("gameFinished",{"winner":room.user1});
						io.to(users.getFromUsername(room.user2).socketId).emit("gameFinished",{"winner":room.user1});
					}
					else if(room.user1Score < room.user2Score){
						io.to(users.getFromUsername(room.user1).socketId).emit("gameFinished",{"winner":room.user2});
						io.to(users.getFromUsername(room.user2).socketId).emit("gameFinished",{"winner":room.user2});
					}
					else{
						io.to(users.getFromUsername(room.user1).socketId).emit("gameFinished",{"winner":0});
						io.to(users.getFromUsername(room.user2).socketId).emit("gameFinished",{"winner":0});
					}
				}
			}
			else{
				if(game.sira == 1){
					game.sira = 2;
				}
				else{
					game.sira = 1;
				}
				io.to(users.getFromUsername(room.user1).socketId).emit("updateGame",{"user1":room.user1,"user2":room.user2,"user1Score":room.user1Score,"user2Score":room.user2Score,"sira":room.sira,"x":x,"y":y,"direction":direction,"change":false,"siraChange":true});
				io.to(users.getFromUsername(room.user2).socketId).emit("updateGame",{"user1":room.user1,"user2":room.user2,"user1Score":room.user1Score,"user2Score":room.user2Score,"sira":room.sira,"x":x,"y":y,"direction":direction,"change":false,"siraChange":true});
			}
		}
		
	});
	socket.on("lineOver",function(data){
		var x = data.x;
		var y = data.y;
		var direction = data.direction;
		var socketId = socket.id;
		var user = users.getFromSocketId(socketId);
		if(user == undefined){
			return false;
		}
		var room = rooms.getFromUsername(user.username);
		if(room == undefined){
			return false;
		}
		var game = room.game;
		var getNode = game.get(x,y);
		var controlledLine = false;
		if(direction == "rightLine" & !getNode.rightLine.active){ controlledLine = true; }
		else if(direction == "bottomLine" & !getNode.bottomLine.active){ controlledLine = true; }
		var sira = room.sira;
		if(sira == 1){
			var controlUser = room.user2;
		}
		else{
			var controlUser = room.user1;
		}
		if(controlledLine == true & user.username != controlUser){
			io.to(users.getFromUsername(controlUser).socketId).emit("lineOvered",data);
		}
	});
	socket.on("lineOut",function(data){
		var x = data.x;
		var y = data.y;
		var direction = data.direction;
		var socketId = socket.id;
		var user = users.getFromSocketId(socketId);
		if(user == undefined){
			return false;
		}
		var room = rooms.getFromUsername(user.username);
		if(room == undefined){
			return false;
		}
		var game = room.game;
		var getNode = game.get(x,y);
		var controlledLine = false;
		if(direction == "rightLine" & !getNode.rightLine.active){ controlledLine = true;}
		else if(direction == "bottomLine" & !getNode.bottomLine.active){ controlledLine = true; }
		var sira = room.sira;
		if(sira == 1){
			var controlUser = room.user2;
		}
		else{
			var controlUser = room.user1;
		}
		if(controlledLine == true & user.username != controlUser){
			io.to(users.getFromUsername(controlUser).socketId).emit("lineOuted",data);
		}
	});
	socket.on("disconnect",function(){
		var socketId = socket.id;
		user = users.getFromSocketId(socketId);
		if(user != undefined){
			users.deleteFromSocketId(socketId);
			var room = rooms.getFromUsername(user.username);
			if(room != undefined){
				rooms.deleteFromUsername(user.username);
				if(user.username == room.user1){
					io.to(users.getFromUsername(room.user2).socketId).emit("gameFinished",{"winner":room.user2});
				}
				else if(user.username == room.user2){
					io.to(users.getFromUsername(room.user1).socketId).emit("gameFinished",{"winner":room.user1});
				}
			}
		}
	});
});
app.get("/",function(req,res){
	res.sendFile(__dirname+"/pages/index.html");
});
