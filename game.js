var buttonColors = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
function colorSound(randomChosenColor) {
    switch (randomChosenColor) {
        case "green":
            var greenAudio = new Audio('./sounds/green.mp3');
            greenAudio.play();
            break;  
        case "red":
            var redAudio = new Audio('./sounds/red.mp3');
            redAudio.play();
            break;  
        case "yellow":
            var yellowAudio = new Audio('./sounds/yellow.mp3');
            yellowAudio.play();
            break;  
        case "blue":
            var blueAudio = new Audio('./sounds/blue.mp3');
            blueAudio.play();
            break;  
        case "wrong":
            var wrongAudio = new Audio('./sounds/wrong.mp3');
            wrongAudio.play();
            break;
        default:
            break;
    }
}


function nextSequence() {
    $('.container').show();
    $('.start').hide();
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    colorSound(randomChosenColor);
    $('.level-title').text("Level " + (++level));
}

$('.btn').click(function () {
    userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);
    colorSound(userChosenColor);
    $(this).addClass('pressed');
    checkAnswer(userClickedPattern.length - 1);
    setTimeout(()=> {
        $(this).removeClass('pressed');
    }, 100);
})

// start game 
$('.start').click(() => {  
    nextSequence();
})

function checkAnswer(currentLevel) {
    
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if(userClickedPattern.length === gamePattern.length) {
            
            setTimeout(() => {           
                nextSequence();
            }, 1000);
        }
    }else {
        gameOver();
    }

    
}

function gameOver() {
    $('.level-title').text("GameOver, Score : " + (level - 1));
    $('body').addClass('game-over');
    gamePattern = [];level = 0;
    userClickedPattern = [];
    $('.start').show().text('Restart Game');
    $('.container').hide();
    colorSound("wrong");
    setTimeout(() => {
        $('body').removeClass('game-over');
    }, 200);
}

