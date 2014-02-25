// Your work goes here...

function draw(){
var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');


	ctx.fillStyle = "#C96A1B";
    ctx.fillRect (0, 548, 900, 52);

	var imageObj = new Image();
	imageObj.src = 'assets/duckhunt.png';

    imageObj.onload = function() {
    ctx.drawImage(imageObj, 0, 700, 900, 150, 0, 412, 900, 150); //bushes
    ctx.drawImage(imageObj, 0, 0, 60, 43, 100, 530, 60, 43); //dog
    ctx.drawImage(imageObj, 0, 0, 60, 43, 100, 530, 60, 43); //tree
    //ctx.drawImage(imageObj, xcoord_orig, ycoord_orig, width, height, desti_x_coord, desti_y_coord, destination_width, destination_height)
    };


}