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
    $('#display-user-name').text(userName + ' wan shinobi');
  } else {
    alert('enter name asshat')
  }
  });

  $('form#create-flashcard').submit(function(event){
    event.preventDefault();
    var flashName = $('input#flash-name').val();
    var flashSnippet = $('input#flash-snippet').val();
    var flashAnswer = $('input#flash-answer').val();
    flashLibrary['flash' + flashCounter] = new Flashcard(flashName, flashSnippet, flashAnswer);
    $('div#actual-list').children('ul').append('<li id="flash' + flashCounter + '" class="flash-item">' + flashName + '</li>');
    flashCounter++;
    // $('div#actual-list').children('ul').last().click(function(){
    //   $('span#show-name').text(flashName);
    //   $('#flashcard-modal').modal('show');
    // });
    $('li.flash-item').last().click(function(){ // click to load current id
      console.log('clicked li');
      currentId = $(this).attr('id');
      console.log(flashLibrary[currentId].name);
      console.log(flashLibrary[currentId].snippet);
      console.log(flashLibrary[currentId].answer);
    });
  });
});
