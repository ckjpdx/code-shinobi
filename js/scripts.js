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
  var flashCounter = 1;
  var flashLibrary = {};
  var currentId;
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
    flashLibrary['flash' + flashCounter] = new Flashcard(flashName, flashSnippet, flashAnswer);
    $('div#actual-list').children('ul').append('<li id="flash' + flashCounter + '" class="flash-item">' + flashName + '</li>');
    flashCounter++;
    $('div#actual-list').children('ul').last().click(function(){
    });
    $('li.flash-item').last().click(function(){ // click to load current id
      currentId = $(this).attr('id');
<<<<<<< HEAD
      console.log(flashLibrary[currentId].name);
      console.log(flashLibrary[currentId].snippet);
      console.log(flashLibrary[currentId].answer);

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
=======
      $('#flashcard-modal').modal('show');
      $('span#show-name').text(flashLibrary[currentId].name);
    });
    $('button#check').click(function(event){
      event.preventDefault();
      console.log("what the f");
      var userAnswer = $("input#user-answer").val();
      $(".flashcard-test").hide();
      if  (userAnswer === flashLibrary[currentId].answer) {
        $("#correct-result").show();
      } else {
        $("#dad-hates-you").show();
      }
>>>>>>> master
    });
  });
});
