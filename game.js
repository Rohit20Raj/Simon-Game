var started = false;
$(document).on('keydown touchend', function () {           // Press any to key to start
    if (!started) {
        setTimeout(function () {                           //Call nextSequence() after a 750 millisecond delay.
            $("h2").text(" ");
            nextSequence();
        }, 750);
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

$("button").on("click", function () {
    var userChosenColour = $(this).attr("class");                       // User chosen color        
    userClickedPattern.push(userChosenColour);                          // Pushing the user chosen color in userClickePattern array
    $("." + userChosenColour).fadeOut(150).fadeIn(150);
    playsound(userChosenColour);
    function playsound(name) {                                          // Playing user chosen color sound            
        var audio = new Audio("sounds/" + name + ".mp3");
        audio.play();
    }
    checkAnswer(userClickedPattern.length - 1);                        //check if the most recent user answer is the same as the game pattern              
});
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {             //check that they have finished their sequence with another if statement.
            setTimeout(function () {                                        //Call nextSequence() after a 1 second delay.
                nextSequence();
            }, 1000);
        }
    }
    else {
        // $("h1").text("GAME OVER ");
        $("h2").text("Your score: " + (Level - 1));
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").css("background-color", "red");
        setTimeout(function () {                                        //Call nextSequence() after a 500 millisecond delay.
            $("body").css("background-color", "white");
        }, 500);
        $("h1").text("Press any key to restart");

        setTimeout(function () {                           //Restart the game.
            startOver();
        }, 750);
        function startOver() {
            Level = 0;
            gamePattern = [];
            started = false;
        }
    }
}
