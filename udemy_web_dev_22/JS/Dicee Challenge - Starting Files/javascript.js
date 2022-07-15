function ranNum() {
	return Math.floor((Math.random()) * 6) + 1;
}
var playerOne = ranNum();
// document.querySelector("img1").textContent = "'dice' + playerOne + '.png'"
document.querySelector(".img1").setAttribute("src", "images/dice" + playerOne + ".png");

var playerTwo = ranNum();
// alert(playerOne);
// alert(playerTwo);
document.querySelector(".img2").setAttribute("src", "images/dice" + playerTwo + ".png");

if (playerOne > playerTwo) {
	document.querySelector("h1").textContent = "Player 1 is winning!";
} else if (playerOne < playerTwo) {
	document.querySelector("h1").textContent = "Player 2 is winning!";
} else {
	document.querySelector("h1").textContent = "Number is equal...";
}

