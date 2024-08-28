var gamePattern=[];
var buttonsColor=["red","blue","green","yellow"];
var userClickedPattern=[];


function nextSequence(){
    userClickedPattern=[];
    var random=Math.floor(Math.random()*4);
    var randomChosenColor=buttonsColor[random];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    animatePress(randomChosenColor);
    
    level++;
    $("h1").text("Level "+level);
}


function playSound(name){
        var audio = new Audio('sounds/'+name+".mp3");
        audio.play();
    
}


function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100)
    ;
}


var started=false;
var level=0;
$(document).keypress(function(){
    if(!started){
    $("h1").text("Level "+level);
    nextSequence();
    started=true;
    }
})



$(".btn").click(function(){
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length===gamePattern.length)
        {
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        console.log("Failed");
        playSound("wrong");
        $("h1").text("Game is Over, Press any key to restart");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
        }
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}