/*document.onload = function() {
 navigator.geolocation.getCurrentPosition(function(position) {
    // Consider this a special listener, an *asynchronous* request 
    lat = position.coords.latitude;
    lng = position.coords.longitude;
    console.log("blah");
	// do something...
  });

}*/

function getMyLocation() {
        lat = -999;
        lng = -999;
        elem = document.getElementById("loc");
        if (navigator.geolocation) {
            // the navigator.geolocation object is supported on your browser
            console.log("Call before navigator.geolocation");
            navigator.geolocation.getCurrentPosition(function(position) {
                console.log("Got location");
                lat = position.coords.latitude;
                lng = position.coords.longitude;
                elem.innerHTML = "<h1>You are in " + lat + ", " + lng + "</h1>";
            });
            console.log("Made the call to get location");
            elem.innerHTML = "<h1>You are in " + lat + ", " + lng + "</h1>";
        }
        else {
            alert("Geolocation is not supported by your web browser.  What a shame!");
        }
    }