Nadav Gavrielov's 2048 Scorecenter

I believe everything outlined in the assignment has been implemented correctly. The two get and the post features all function properly and only function when they are supposed to.

I worked with TA's (Jasper, Nate, and Tyler)
I probably spent 6 hours on this assignment.

The final score and grid are found in the game_manager.js file. They are stored in the following section:
~~~~~~~~~~
	// Clear the state when the game is over (game over only, not win)
  	if (this.over) {
    var info = this.serialize();
    console.log(info.score);
    console.log(info.grid);
    $.post( "http://safe-earth-1200.herokuapp.com/submit.json", { username: "Nadav", score: info.score, grid: info.grid} );
    this.storageManager.clearGameState();
  } else {
    this.storageManager.setGameState(this.serialize());
  }
~~~~~~~~~~

This indicates that they are stored and accessible in 'this', which I serialize and place in the object 'info'. We can access them, as I do above, through using info.score and info.grid.

In order to send them to my web application, I had to use $.post (as shown above) in game_manager.js. I put the URL of the score center. Then for the data itself, I hardcoded my username, and input the score and grid from the game as described above.