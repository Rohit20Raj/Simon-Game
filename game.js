var started = false;
$(document).keydown(function () {
    if (!started) {
        nextSequence();
        started = true;
    }
});

var Level = 0;
var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["green", "red", "yellow", "blue"];
// alert("Working...");

// alert("Working...(2)");
function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);                       // Generating a random number
    Level++;

    var randomChosenColor = buttonColors[randomNumber];                     // Choosing a random color

    gamePattern.push(randomChosenColor);                                    // Pushing the random color in game pattern array

    $("h1").text("Level " + Level);

    $("." + randomChosenColor).fadeOut(50).fadeIn(50);                      // Flashing the chosen color/button

    var sound = new Audio("sounds/" + buttonColors[randomNumber] + ".mp3"); // Playing sound for chosen button
    sound.play();

    
}
$("button").on("click", function () {                                         // User chosen color
    var userChosenColour = $(this).attr("class");
    userClickedPattern.push(userChosenColour);                          // Pushing the user chosen color in userClickePattern array
    $("." + userChosenColour).fadeOut(150).fadeIn(150);
    playsound(userChosenColour);
    function playsound(name) {
        var audio = new Audio("sounds/" + name + ".mp3");
        audio.play();
    }
    checkAnswer(userClickedPattern.length - 1);                                      // Playing user chosen color sound
});
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {   //check if the most recent user answer is the same as the game pattern
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {             //check that they have finished their sequence with another if statement.
            setTimeout(function () {                                        //Call nextSequence() after a 1000 millisecond delay.
                nextSequence();
            }, 1000);
        }
    }
    else{
        alert("You messed up...!");
        alert("Your score: "+Level);
        location.reload();
    }
}