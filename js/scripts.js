// Business Logic
function User(name) {
  this.name = name;
}

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

function clearFroms(){
  $('input').val("");
  $('textarea').val("");
}

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

  $('a#ready-to-play').click(function() {
    $("#carousel-controls").slideUp();
    $(".container-fluid").show();
    $("#user-div").slideDown();
  });

  $('button#lets-do-this').click(function() {
    $("#carousel-controls").slideUp();
    $(".container-fluid").show();
    $("#user-div").slideDown();
  });

  $('form#create-user').submit(function(event) {
    if ($('input#username').val().length) {
    event.preventDefault();
    var userName = $('input#username').val();
    user = new User(userName);
    $('form#create-flashcard').slideDown();
    $('#user-div').slideUp();
    $('#name-row').slideDown();
    $('#display-user-name').text(userName + '-wan Shinobi-san');
    $('#study-button').slideDown();
    } else {
      alert('Enter your name, ninja')
    }
  });

  $('#study-button').click(function(){
    $('#practice-delete').slideDown();
    $('.delete-button').show();
  }); 

  $('form#create-flashcard').submit(function(event){
    event.preventDefault();
    var flashName = $('input#flash-name').val();
    var flashSnippet = $('textarea#flash-snippet').val();
    var flashAnswer = $('input#flash-answer').val();
    flashLibrary['flash' + flashCounter] = new Flashcard(flashName, flashSnippet, flashAnswer);
    $('div#actual-list').append('<div id="flash' + flashCounter + '" class="flash-item">' + '<h4><i class="fa fa-book"></i> ' + flashName + '</h4><div class="flash-item-snippet"><p class="snippet-text"></p><p>Answer: <span class="answer-text"></span></p></div></div>');
    $('div#flash' + flashCounter).find('p.snippet-text').text(flashSnippet);
    $('div#flash' + flashCounter).find('span.answer-text').text(flashAnswer);
    flashCounter++;
    clearFroms();
    $('div.flash-item').last().click(function(){ // click to load current id
      currentId = $(this).attr('id');
      $('div.flash-item').css('color', 'inherit');
      $(this).css('color', 'rgba(255, 248, 240, 1)');
      $('div.flash-item').children('div.flash-item-snippet').slideUp();
      $(this).children().slideDown();
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
  $('button#delete-flash').click(function(){
    $('div#' + currentId).remove();
    delete flashLibrary[currentId];
  });
  $('button#check').click(function(event) {
    event.preventDefault();
    var userAnswer = $("input#user-answer").val();
    if (userAnswer === flashLibrary[randomId].answer) {
      $('div#' + randomId).append('<i class="fa fa-star-o" aria-hidden="true"></i>');
      if (remainingCards.length === 1) {
        $("#correct-result").show();
        $(".flashcard-test").hide();
      } else {
      remainingCards.splice(randomCardIndex, 1);
      getNextRandomCardIndex();
      modalText();
      }
    } else {
      $('#flashcard-modal').effect( "shake" );
      $(".flashcard-test").hide();
      $("#dad-hates-you").show();
    }
    clearFroms();
  });
  $('button#try-again').click(function(){
    $("#dad-hates-you").hide();
    $(".flashcard-test").show();
  });
});
