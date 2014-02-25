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
    ctx.drawImage(imageObj, 0, 273, 84, 124, 300, 450, 84, 124); //tree
	ctx.drawImage(imageObj, 0, 119, 39, 32, 280, 20, 39, 32); //bird_1
	ctx.drawImage(imageObj, 134, 196, 31, 31, 400, 100, 31, 31); //bird_2
	ctx.drawImage(imageObj, 337, 155, 38, 38, 30, 300, 38, 38); //bird_3
	ctx.drawImage(imageObj, 166, 118, 40, 30, 20, 40, 40, 30); //bird_4
	ctx.drawImage(imageObj, 81, 193, 36, 36, 600, 70, 36, 36); //bird_5
    //ctx.drawImage(imageObj, xcoord_orig, ycoord_orig, width, height, desti_x_coord, desti_y_coord, destination_width, destination_height)
    };


}