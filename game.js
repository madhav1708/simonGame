var buttonColour=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
$(document).keypress(function(){
  if(level===0){
  $("#level-title").text("Level 0");
  nextSequence();
}
});


$(".btn").click(function(){
  // So if the Green button was clicked, userChosenColour will equal its id which is "green".
  var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
  //  console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    var s=userClickedPattern.length;
    checkAnswer(s);
});

function nextSequence(){
  level++;
  userClickedPattern=[];
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColour=buttonColour[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

  $("#level-title").text("Level "+level);

}
function playSound(color){
  var audio=new Audio("sounds/"+color+".mp3" );
  audio.play();
}
function animatePress(currentColour){
  var delayInMilliseconds = 100;

  $("#"+currentColour).addClass("pressed");
  setTimeout(function() {
  $("#"+currentColour).removeClass("pressed");
}, delayInMilliseconds);
}

function startOver(){
  level=0;
  gamePattern=[];
}
function checkAnswer(n){

  if(userClickedPattern[n-1]===gamePattern[n-1]){
  //console.log("pass");
  if(userClickedPattern.length===gamePattern.length){
  var delayInMilliseconds = 1000;
  setTimeout(function() {
  nextSequence();
  }, delayInMilliseconds);
}
}
else {
//  console.log("fail");
  $("#level-title").text("Game Over, Press Any Key to Restart");
  playSound("wrong");
  $("body").addClass("game-over");
    var delayInMilliseconds = 200;
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, delayInMilliseconds);
  startOver();
}


}
