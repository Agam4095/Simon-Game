
$(document).ready(function () {
    var userClickedPattern = []
    var gamePattern = []
    var level = 0
    var started = false

    $(".btn").on('click', function (e) {
        var userChosenColour = e.target.id
        userClickedPattern.push(userChosenColour)
        animatePress(userChosenColour)
        playSound(userChosenColour)
        checkAnswer(userClickedPattern.length - 1)
    })
    $(document).keydown(function () {
        if (!started) {
            $("#level-title").text('Level' + level)
            nextSequence()
            started = true

        }

    });

    function nextSequence() {
        level++
        userClickedPattern = []
        $("#level-title").text('Level' + level)
        var randomNumber = Math.floor(Math.random() * 4)
        var buttonColors = ["red", "blue", "green", "yellow"]
        var randomChosenColour = buttonColors[randomNumber]
        gamePattern.push(randomChosenColour)
        var $button = $("#" + randomChosenColour)
        $button.fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(randomChosenColour)



    }
    function playSound(name) {
        var audio = new Audio(`sounds/${name}.mp3`)
        audio.play()
    }
    function animatePress(currentColour) {
        $("#" + currentColour).addClass('pressed');
        setTimeout(() => {
            $("#" + currentColour).removeClass('pressed');
        }, 100);
    }
    function checkAnswer(currentLevel) {
        if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
            console.log("success")
            if (userClickedPattern.length === gamePattern.length) {
                setTimeout(() => {
                    nextSequence()
                }, 1000);
            }
        } else {
            playSound('wrong')
            $("body").addClass("game-over")
            setTimeout(() => {
                $("body").removeClass("game-over")
                $("#level-title").text("Game Over, Press Any Key to Restart")
            }, 200);
            startOver()
        }
    }
    function startOver() {
        gamePattern = []
        level = 0
        started = false
    }
}
)



