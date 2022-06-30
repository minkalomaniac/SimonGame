let buttonColours = ["red", "blue", "green","yellow"];

let gamePattern = [];



var level =0;
//detect first keypress
$(document).one("keydown", function (){
  nextSequence();

  $("#level-title").text("Level "+ level);
})

//detect click
$(".btn").click (function (){

  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);

})

function checkAnswer(currentLevel){
if (userClickedPattern[currentLevel] === gamePattern[currentLevel])
{
  console.log("success");
  //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
//why?
  if (userClickedPattern.length === gamePattern.length){

    //5. Call nextSequence() after a 1000 millisecond delay.
    setTimeout(function () {
      nextSequence();
    }, 1000);

  }
}else{
  console.log("wrong");
  var audio3 = new Audio ("sounds/wrong.mp3");
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  }, 200);
  $("#level-title").text("Game Over, Press Any Key to Restart");
  startOver();
}
}


//do the thing once
function nextSequence(){
///what?
  userClickedPattern = [];
    level++;
//what?
    $("#level-title").text("Level "+ level);

  var randomNumber = Math.round((Math.random()*3));
  let randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

}



function playSound(name) {
  var audio = new Audio ("sounds/"+name+".mp3");
  audio.play();

}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
      $("#"+currentColour).removeClass("pressed");
    },100);
  }

//start Over
function startOver() {
  level = 0;
  gamePattern = [];
  $(document).unbind("keydown").one("keydown", function (){
    nextSequence();

    $("#level-title").text("Level "+ level);
  });

}
