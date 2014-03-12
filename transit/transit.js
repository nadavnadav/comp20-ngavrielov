//from geolocation_map.html example:
/*var request = new XMLHttpRequest();
var map;
var marker;
var places;
var mapOptions = {
    zoom: 8,
    center: new google.maps.LatLng(-34.397, 150.644)
  };

function init()
			{
				map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
				getMyLocation();
			}
			

function getMyLocation() {
	//from geo_example.html in class:
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
                //elem.innerHTML = "<h1>You are in " + lat + ", " + lng + "</h1>";
            });
            console.log("Made the call to get location");
            //elem.innerHTML = "<h1>You are in " + lat + ", " + lng + "</h1>";
            renderMap();
        }
        else {
            alert("Geolocation is not supported by your web browser.  What a shame!");
        }
    }

function renderMap()
{
var me = new google.maps.LatLng(lat, lng);
map.panTo(me);
//service = new google.maps.places.PlacesService(map);
		//		service.search(request, callback);

}
*/


//From geolocation map example:
var myLat = 0;



			var myLng = 0;
			var request = new XMLHttpRequest();
			var me = new google.maps.LatLng(myLat, myLng);
			var myOptions = {
						zoom: 13, // The larger the zoom number, the bigger the zoom
						center: me,
						mapTypeId: google.maps.MapTypeId.ROADMAP
					};
			var map;
			var marker;
			var infowindow = new google.maps.InfoWindow();
			var places;
			
			function init()
			{
				map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
				getMyLocation();
			}
			
			function getMyLocation()
			{
				if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser
					navigator.geolocation.getCurrentPosition(function(position) {
						userLat = position.coords.latitude;
						userLng = position.coords.longitude;
						renderMap();
					});
				}
				else {
					alert("Geolocation is not supported by your web browser.");
				}
			}

			function renderMap()
			{
				me = new google.maps.LatLng(userLat, userLng);
				// Update map and go there...
				map.panTo(me);
				var icon_image = 'https://cdn4.iconfinder.com/data/icons/48x48-free-object-icons/48/Elephant.png';
				// Create a marker
				marker = new google.maps.Marker({
					position: me,
					title: "Here I Am!",
					icon: icon_image,
					animation: google.maps.Animation.DROP
				});

				marker.setMap(map);
				google.maps.event.addListener(marker, 'click', toggleBounce);

				// Open info window on click of marker
				google.maps.event.addListener(marker, 'click', function() {
					infowindow.setContent(marker.title);
					infowindow.open(map, marker);
				});
				
				// Calling Google Places API
				/*var request = {
					location: me,
					radius: '500',
					types: ['food']
				};
				service = new google.maps.places.PlacesService(map);
				service.search(request, callback);*/
			}
			
			function toggleBounce() {
			//From https://developers.google.com/maps/documentation/javascript/markers:
  				if (marker.getAnimation() != null) {
    				marker.setAnimation(null);
  				} else {
    				marker.setAnimation(google.maps.Animation.BOUNCE);
  				}
			}
			// Taken from http://code.google.com/apis/maps/documentation/javascript/places.html
			function callback(results, status)
			{
				if (status == google.maps.places.PlacesServiceStatus.OK) {
					alert("Got places back!");
					places = results;
					for (var i = 0; i < results.length; i++) {
						createMarker(results[i]);
					}
				}
			}
			
			function createMarker(place)
			{
				var placeLoc = place.geometry.location;
				var marker = new google.maps.Marker({
					map: map,
					position: place.geometry.location
				});

				google.maps.event.addListener(marker, 'click', function() {
					infowindow.close();
					infowindow.setContent(place.name);
					infowindow.open(map, this);
				});
			}