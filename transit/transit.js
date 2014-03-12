//From geolocation map example:
			var myLat = 0;
			var myLng = 0;
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
			var request;
			
			function init()
			{
				request = new XMLHttpRequest();
				request.open("get", "http://mbtamap.herokuapp.com/mapper/rodeo.json", true); //executes a get request to the URL
				request.onreadystatechange = dataReady; //deals with response; onreadystatechange has to be set to a function when request is completed to handle the response
				request.send(null); //execute!
				map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
			
				getMyLocation();
			}
			
			function dataReady() {
	//console.log("In dataready, readyState is " + xhr.readyState);
	//The readystate numbers:
	// 0 = not initalized
	// 1 = set up
	// 2 = sent
	// 3 = in progress
	// 4 = complete
		if (request.readyState == 4 && request.status == 200) {
			scheduleData = JSON.parse(request.responseText);
			console.log(scheduleData.line);
			color = scheduleData.line;
			lineDrawer(color);
		}
		else if (request.readyState == 4 && request.status == 500){
					//	scheduleDom = document.getElementById("schedule");
					//	scheduleDom.innerHTML = '<p><img src="http://www.1art.com/old/6.jpg" alt="fail"/></p>';
		}
}

			function lineDrawer(color){     
				//if (color == 'red'){     
					var orangelines = '[{"color":"orange","name":"Oak Grove","lat":42.43668,"lng":-71.071097},{"color":"orange","name":"Malden Center","lat":42.426632,"lng":-71.07411},{"color":"orange","name":"Wellington","lat":42.40237,"lng":-71.077082},{"color":"orange","name":"Sullivan","lat":42.383975,"lng":-71.076994},{"color":"orange","name":"Community College","lat":42.373622,"lng":-71.069533},{"color":"orange","name":"North Station","lat":42.365577,"lng":-71.06129},{"color":"orange","name":"Haymarket","lat":42.363021,"lng":-71.05829},{"color":"orange","name":"State Street","lat":42.358978,"lng":-71.057598},{"color":"orange","name":"Downtown Crossing","lat":42.355518,"lng":-71.060225},{"color":"orange","name":"Chinatown","lat":42.352547,"lng":-71.062752},{"color":"orange","name":"Tufts Medical","lat":42.349662,"lng":-71.063917},{"color":"orange","name":"Back Bay","lat":42.34735,"lng":-71.075727},{"color":"orange","name":"Mass Ave","lat":42.341512,"lng":-71.083423},{"color":"orange","name":"Ruggles","lat":42.336377,"lng":-71.088961},{"color":"orange","name":"Roxbury Crossing","lat":42.331397,"lng":-71.095451},{"color":"orange","name":"Jackson Square","lat":42.323132,"lng":-71.099592},{"color":"orange","name":"Stony Brook","lat":42.317062,"lng":-71.104248},{"color":"orange","name":"Green Street","lat":42.310525,"lng":-71.107414},{"color":"orange","name":"Forest Hills","lat":42.300523,"lng":-71.113686}]';     
					positions = []
					markers = [];
					testparsed = JSON.parse(orangelines);
					orange_icon = 'orange_icon.png';
					for (i=0; i < 19; i++)
					{
						console.log(i);
						marker_a = new google.maps.LatLng(testparsed[i].lat, testparsed[i].lng);
						positions.push(marker_a);
						markers.push(new google.maps.Marker({
							position: marker_a,
							title: "Station",
							icon: orange_icon,
						}));
					} 
					for (i = 0; i<markers.length;i++) {

						console.log(i);
						markers[i].setMap(map);
					}
					// Please refer to https://developers.google.com/maps/documentation/javascript/examples/polyline-simple
					samplePolyLine= new google.maps.Polyline({
    					path: positions,
					    geodesic: true,
    					strokeColor: '#FF0000',
    					strokeOpacity: 1.0,
					    strokeWeight: 1
					  });
					samplePolyLine.setMap(map);
				/*}     
				if (color == 'orange'){


				}
				if (color == 'blue'){


				}*/
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
					title: "Current location",
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





		/*function parse() {
		parsedtext = JSON.parse(request);
		console.log(parsedtext[0].line);
		}
*/
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