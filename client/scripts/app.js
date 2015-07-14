// YOUR CODE HERE:

var name = "";
var roomname = "All";
var rooms = {};
var friends = {};
var posts = {};
  var postMessage = {
    username: name,
    text: "",
    roomname: roomname
  };
var postRequest = function(message){

  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');

      // setTimeout(postRequest, 300);
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
}


var addMessage = function(message){
  var $post = $("<div></div>").text(message.text).addClass(message.username).appendTo($("#chats"));
  var $span = $("<span></span>").text(message.username + ": ").addClass("username").prependTo($post);
  var temp = function(){
    var username = message.username;
    $span.on('click', function(){
    console.log(username);
    app.addFriend(username);
    }); 
  }();
};


var getRequest = function(){
  $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    contentType: 'application/json',
    success:function (data){
      posts = data.results;
      console.log("worked");
      $("#chats").children().remove();
      rooms = {};
      for(var i = 0 ; i < posts.length ; i ++){
        rooms[posts[i].roomname]= posts[i].roomname;
        roomname = $("select")[0].value;
        // if(posts[i].roomname === roomname || roomname === "All"){
        addMessage(posts[i]);
          //ANONYMOUS FUNCTION TO HOLD USERNAME

        // }
      }
      roomMaker();
    },
    error:function (data){
      console.log("This is fucked up");
    }
  });
};

var roomMaker = function(){
  $("select option").remove();
   $("<option></option>").text("All").appendTo($("select"));
  for(var key in rooms ){
    addRoom(key);
  }
};

getRequest();
$("document").ready(function(){
  $(".message").click(function(e){
      postRequest($("#message")[0].value);
  });

  $("select").change(function(e){
    getRequest();
  });

  $(".usernameFuck").click(function(e){
    name = $("#username")[0].value
  });

  $(".submit").submit(function(e){
    var message = {
      username: name,
      text: $("#message")[0].value,
      roomname: roomname
    }
    app.handleSubmit(message);
  });
});

var addFriend = function(username){
  friends[username] = username;
};
var addRoom = function(room){
  $("<option></option>").text(room).appendTo($("#roomSelect"));
};


var app = {
  init: function(){},
  send:postRequest,
  fetch:getRequest,
  server: "https://api.parse.com/1/classes/chatterbox",
  clearMessages: function(){$("#chats").children().remove();},
  addMessage: addMessage,
  addRoom: addRoom,
  addFriend: addFriend,
  handleSubmit: postRequest,

};