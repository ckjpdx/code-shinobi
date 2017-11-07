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
    if ($('input#username').val().length) {
    event.preventDefault();
    var userName = $('input#username').val();
    var user = new User(userName);
    $('form#create-flashcard').slideDown();
    $('form#create-user').slideUp();
    $('#name-score-row').slideDown();
    console.log("help me");
    $('#display-user-name').text(userName + ' wan Shinobi');
  } else {
    alert('enter name asshat')
  }
  });


  $('form#create-flashcard').submit(function(event){
    event.preventDefault();
    var flashName = $('input#flash-name').val();
    var flashSnippet = $('textarea#flash-snippet').val();
    var flashAnswer = $('textarea#flash-answer').val();
    var flashcard = new Flashcard(flashName, flashSnippet, flashAnswer);
    $('div#actual-list').children('ul').append('<li>' + flashName + '</li>');
    $('div#actual-list').children('ul').last().click(function(){
      $('span#show-name').text(flashName);
      $('span#show-snippet').text(flashSnippet);
      var userAnswer = $("input#user-answer").val();
      $('#flashcard-modal').modal('show');

    $('form#user-answer').submit(function(event){
        event.preventDefault();
        console.log("helloooooooooo");
        $(".flashcard-test").hide();

        if  (userAnswer === flashAnswer) {
          $("#correct-result").show();
        } else {
          $("#dad-hates-you").show();
        }

      });
    });
  });
});
