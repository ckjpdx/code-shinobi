// Business Logic
function User(name) {
  this.name = name;
  this.points = 0;
}
User.prototype.scoreUp = function () {
  this.points++;
  return this.points;
};

function Flashcard(name, snippet, answer) {
  this.name = name;
  this.snippet = snippet;
  this.answer = answer;
}
Flashcard.prototype.checkAnswer = function (userGuess) {
var isGuessCorrect = false;
  if (this.answer === userGuess) {
    isGuessCorrect = true;
  }
return isGuessCorrect;
};

// FRONTEND
$(function(){
  var flashCounter = 1;
  var flashLibrary = {};
  var remainingCards = [];
  var randomCardIndex;
  var currentId;
  var randomId;
  var user;
  function modalText(){
    $('span#show-name').text(flashLibrary[randomId].name);
    $('span#show-snippet').text(flashLibrary[randomId].snippet);
  }
  function getNextRandomCardIndex() {
    randomCardIndex = (Math.floor(Math.random() * remainingCards.length));
    randomId = remainingCards[randomCardIndex];
  }

  $('button#lets-do-this').click(function() {
    $("#carousel-controls").slideUp();
    $("#user-div").slideDown();
  });

  $('form#create-user').submit(function(event) {
    if ($('input#username').val().length) {
    event.preventDefault();
    var userName = $('input#username').val();
    user = new User(userName);
    $('form#create-flashcard').slideDown();
    $('#user-div').slideUp();
    $('#name-score-row').slideDown();
    $('#display-user-name').text(userName + '-wan Shinobi-san');
    } else {
      alert('Enter your name, ninja')
    }
  });
  $('form#create-flashcard').submit(function(event){
    event.preventDefault();
    var flashName = $('input#flash-name').val();
    var flashSnippet = $('textarea#flash-snippet').val();
    var flashAnswer = $('input#flash-answer').val();
    flashLibrary['flash' + flashCounter] = new Flashcard(flashName, flashSnippet, flashAnswer);
    $('div#actual-list').children('ul').append('<li id="flash' + flashCounter + '" class="flash-item">' + '<i class="fa-li fa fa-book"></i>' + flashName + '</li>');
    flashCounter++;
    $('li.flash-item').last().click(function(){ // click to load current id
      currentId = $(this).attr('id');
      $('li.flash-item').css('color', 'inherit');
      $(this).css('color', 'rgba(255, 248, 240, 1)');
    });
  });
  $('button#practice-flash').click(function(){
    $('#flashcard-modal').modal('show');
    $("#correct-result").hide();
    $("#dad-hates-you").hide();
    $(".flashcard-test").show();
    remainingCards = Object.keys(flashLibrary);
    getNextRandomCardIndex();
    console.log(randomId);
    modalText();
  });
  $('button#update-flash').click(function(){
  });
  $('button#delete-flash').click(function(){
    $('li#' + currentId).remove();
    delete flashLibrary[currentId];
    console.log(flashLibrary);
  });
  $('button#check').click(function(event) {
    event.preventDefault();
    var userAnswer = $("input#user-answer").val();
    console.log(randomId);
    console.log(flashLibrary[randomId]);
    console.log('answer: ');console.log(userAnswer);
    if (userAnswer === flashLibrary[randomId].answer) {
      $("#display-user-score").text(user.scoreUp());
      if (remainingCards.length === 1) {
        $("#correct-result").show();
        $(".flashcard-test").hide();
      } else {
      remainingCards.splice(randomCardIndex, 1);
      getNextRandomCardIndex();
      modalText();
      }
    } else {
      $(".flashcard-test").hide()
      $("#dad-hates-you").show();
    }
  });
  $('button#try-again').click(function(){
    $("#dad-hates-you").hide();
    $(".flashcard-test").show()
  });
});
