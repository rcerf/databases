$(function(){ // on ready
  if(!('contains' in String.prototype))
    String.prototype.contains = function(str, startIndex) { return -1 !== String.prototype.indexOf.call(this, str, startIndex); };

  var timelineLength = 0;
  var username = window.location.search.replace('?username=','');
  var roomname = "messages";
  var usernames = {};
  var chatrooms = {};
  var messages = {};
  var followed = {};

  var displayMessages = function(){
    var url = "http://127.0.0.1:8080/classes/" + $('.room-option :selected').val() + "/";
    $.get( url, function( data ) {
      $(".timeline").html("");
      messages = data;
      console.log(messages);
      for (var i = 0; i < messages.length; i++){
        var mes = messages[i];
        $('.timeline').append($("<div>"));
        $('.timeline > div').last().addClass('post');
        $('.post').last().append($("<span>"));
        $('.post > span').last().addClass('username').text(mes.username + ": ");
        $('.post').last().append($('<span>'));
        if (followed[mes.username]){
          $('.post').last().addClass('followed');
        }
        $('.username').last().on('click', function(){
          followed[$(this).text().slice(0,-2)] = $(this).text().slice(0,-2);
          // $('.username').addClass('followed');
          var $that = $(this);
          for (var i = 0; i < $('.username').length; i++){
            if ($($(".username")[i]).text() === $that.text()){
              $($(".username")[i]).addClass('followed');
            }
          }
        });
        $('.post > span').last().addClass('message');
        $('.message').last().text(mes.text);
        if (!chatrooms[mes.roomname]) {
          chatrooms[mes.roomname] = false;
        }
      }
      for (var keys in chatrooms){
        if (!chatrooms[keys]) {
          $('.room-option').append($("<option>"));
          $('.room-option > option').last().text(keys);
          chatrooms[keys] = true;
        }
      }
      timelineLength = messages.length;
    });
  };
  displayMessages();
  setInterval(displayMessages, 3000);

  var addPost = function(message, url){
    $.ajax({
      url: url,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // see https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message');
      }
    });
  };

  var postMessage = function(e){
    e.preventDefault();
    // window.username = $('option:selected');
    var text = $('input[name=post]').val();
    roomname = $('.room-option :selected').val();
    var message = {
      'username': username,
      'text': text,
      'roomname': roomname
    };

    var url = 'http://127.0.0.1:8080/classes/' + roomname + "/";
    addPost(message, url);
  };

  $('input[type=submit]').on('click', postMessage);

  $(".username-option").prepend($('<option>'));
  $('.username-option > option').first().text(username || "anonymous");
  // $(".username-option").append($('<option>'));
  // $('.username-option > option').last().addClass("addUsername").text("add username");

  $('.addUsername').on('click',function(e){
    e.preventDefault();
    var newUsername = prompt("Add new username:" || 'anonymous');
    if (!usernames[newUsername]) {
      $(".username-option").append($('<option>'));
      $('.username-option > option').last().text(newUsername);
      username = newUsername;
      usernames[newUsername] = newUsername;
    }
  });

  $('#usernames').change(function(){
    username = $('#usernames :selected').text();
  });

  var appendDiv = function(mes){
    $('.timeline').append($("<div>"));
    $('.timeline > div').last().addClass('username');
    $('.username').last().text(mes.username + ": ");
    $('.username').last().append($('<span>'));
    $('.username > span').last().addClass('message');
    $('.message').last().text(mes.text);
  };

  $('#rooms').change(function(){
    displayMessages();
  });

  $('.addChatroom').on('click',function(e){
    e.preventDefault();
    var newChatroom = prompt("Add new chatroom:" || 'default');
    if (!chatrooms[newChatroom]){
      $(".room-option").append($('<option>'));
      $('.room-option > option').last().text(newChatroom);
      roomname = newChatroom;
      chatrooms[newChatroom] = newChatroom;
    }
  });

});
