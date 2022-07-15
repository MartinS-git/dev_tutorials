var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

function nextSequence(){
	userClickedPattern = [];
	started = true;
	document.querySelector("h1").innerHTML = "Level " + level;
	level++;
	var randomNumber = Math.floor(Math.random() * 4);
	var randomChosenColour = buttonColours[randomNumber];
	gamePattern.push(randomChosenColour);
	var currentElement = document.querySelector("#" + randomChosenColour)
	currentElement.classList.add("fade-outin");
	setTimeout(function() {
		currentElement.classList.remove("fade-outin");
	  }, 200);
	playSound(randomChosenColour);
}

document.addEventListener("keydown", function(){
	if (started === false) {
		nextSequence();
	}	
});

var anyButton = document.querySelectorAll(".btn");
for (var i = 0; i <= anyButton.length; i++) {
	document.querySelectorAll(".btn")[i].addEventListener("click", function() {
		var userChosenColour = this.getAttribute("id");
		userClickedPattern.push(userChosenColour);
		playSound(userChosenColour);
		animatePress(userChosenColour);
		checkAnswer(userClickedPattern.length-1);
	});
}

function playSound(name) {
	var audio = new Audio("sounds/" + name + ".mp3");
	audio.play();
}

function animatePress(currentColour) {
	var currentElement = document.querySelector("#" + currentColour)
	currentElement.classList.add("pressed");
	setTimeout(function() {
		currentElement.classList.remove("pressed");
	  }, 100);
}

function checkAnswer(currentLevel) {
	if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
		console.log("Right");
		if (userClickedPattern.length === gamePattern.length){

			//5. Call nextSequence() after a 1000 millisecond delay.
			setTimeout(function () {
			  nextSequence();
			}, 1000);
	
		  }
	} else {
		document.querySelector("h1").innerHTML = "Game Over, Press Any Key to Restart";
		started = false;
		var bodyWrong = document.querySelector("body");
		bodyWrong.classList.add("game-over");
	setTimeout(function() {
		bodyWrong.classList.remove("game-over");
	  }, 200);
	  gamePattern = [];
	  level = 0;
		playSound(wrong);
	}
}


