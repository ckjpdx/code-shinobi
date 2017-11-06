// Business Logic
function User(name) {
  this.name = name;
  this.points = 0;
}
User.prototype.scoreUp = function () {
  this.points++;
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
  $('form#create-user').submit(function(event) {
    event.preventDefault();
    console.log('yes');
    var userName = $('input#username').val();
    var user = new User(userName);
    $('#create-flashcard').slideDown();
  });


  $('form#create-flashcard').submit(function(event){
    event.preventDefault();
    var flashName = $('input#flash-name').val();
    var flashSnippet = $('input#flash-snippet').val();
    var flashAnswer = $('input#flash-answer').val();
    var flashcard = new Flashcard(flashName, flashSnippet, flashAnswer);
    $('div#actual-list').children('ul').append('<li>' + flashName + '</li>');
    $('div#actual-list').children('ul').last().click(function(){
      $('span#show-name').text(flashName);
      $('#flashcard-modal').modal('show');
    });
  });
});
