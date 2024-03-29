			if (typeof(Number.prototype.toRad) === "undefined") {
			  Number.prototype.toRad = function() {
			    return this * Math.PI / 180;
			  }
			}		 //got that from http://stackoverflow.com/questions/5260423/torad-javascript-function-throwing-error	

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
			stopInfo = [];
			
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
	//The readystate numbers:
	// 0 = not initalized
	// 1 = set up
	// 2 = sent
	// 3 = in progress
	// 4 = complete
		if (request.readyState == 4 && request.status == 200) {
			scheduleData = JSON.parse(request.responseText);
			//console.log(scheduleData.line);
			color = scheduleData.line;
			lineDrawer(color, scheduleData);
		}
		else if (request.readyState == 4 && request.status == 500){
			//failed to load
		}
}

			function lineDrawer(color, scheduleData){     
					var orangelines = '[{"color":"orange","name":"Oak Grove","lat":42.43668,"lng":-71.071097},{"color":"orange","name":"Malden Center","lat":42.426632,"lng":-71.07411},{"color":"orange","name":"Wellington","lat":42.40237,"lng":-71.077082},{"color":"orange","name":"Sullivan","lat":42.383975,"lng":-71.076994},{"color":"orange","name":"Community College","lat":42.373622,"lng":-71.069533},{"color":"orange","name":"North Station","lat":42.365577,"lng":-71.06129},{"color":"orange","name":"Haymarket","lat":42.363021,"lng":-71.05829},{"color":"orange","name":"State Street","lat":42.358978,"lng":-71.057598},{"color":"orange","name":"Downtown Crossing","lat":42.355518,"lng":-71.060225},{"color":"orange","name":"Chinatown","lat":42.352547,"lng":-71.062752},{"color":"orange","name":"Tufts Medical","lat":42.349662,"lng":-71.063917},{"color":"orange","name":"Back Bay","lat":42.34735,"lng":-71.075727},{"color":"orange","name":"Mass Ave","lat":42.341512,"lng":-71.083423},{"color":"orange","name":"Ruggles","lat":42.336377,"lng":-71.088961},{"color":"orange","name":"Roxbury Crossing","lat":42.331397,"lng":-71.095451},{"color":"orange","name":"Jackson Square","lat":42.323132,"lng":-71.099592},{"color":"orange","name":"Stony Brook","lat":42.317062,"lng":-71.104248},{"color":"orange","name":"Green Street","lat":42.310525,"lng":-71.107414},{"color":"orange","name":"Forest Hills","lat":42.300523,"lng":-71.113686}]';
					var blueLines = '[{"color":"blue","name":"Wonderland","lat":42.41342,"lng":-70.991648},{"color":"blue","name":"Revere Beach","lat":42.40784254,"lng":-70.99253321},{"color":"blue","name":"Beachmont","lat":42.39754234,"lng":-70.99231944},{"color":"blue","name":"Suffolk Downs","lat":42.39050067,"lng":-70.99712259},{"color":"blue","name":"Orient Heights","lat":42.386867,"lng":-71.004736},{"color":"blue","name":"Wood Island","lat":42.3796403,"lng":-71.02286539},{"color":"blue","name":"Airport","lat": 42.374262,"lng":-71.030395},{"color":"blue","name":"Maverick","lat":42.36911856,"lng":-71.03952958},{"color":"blue","name":"Aquarium","lat":42.359784,"lng":-71.051652},{"color":"blue","name":"State Street","lat":42.358978,"lng":-71.057598},{"color":"blue","name":"Government Center","lat":42.359705,"lng":-71.059215},{"color":"blue","name":"Bowdoin","lat":42.361365,"lng":-71.062037}]';
					var redLines = '[{"color":"red","name":"Alewife","lat":42.395428,"lng":-71.142483},{"color":"red","name":"Davis","lat":42.39674,"lng":-71.121815},{"color":"red","name":"Porter Square","lat":42.3884,"lng":-71.119149},{"color":"red","name":"Harvard Square","lat":42.373362,"lng":-71.118956},{"color":"red","name":"Central Square","lat":42.365486,"lng":-71.103802},{"color":"red","name":"Kendall/MIT","lat":42.36249079,"lng":-71.08617653},{"color":"red","name":"Charles/MGH","lat":42.361166,"lng":-71.070628},{"color":"red","name":"Park Street","lat":42.35639457,"lng":-71.0624242},{"color":"red","name":"Downtown Crossing","lat":42.355518,"lng":-71.060225},{"color":"red","name":"South Station","lat":42.352271,"lng":-71.055242},{"color":"red","name":"Broadway","lat":42.342622,"lng":-71.056967},{"color":"red","name":"Andrew","lat":42.330154,"lng":-71.057655},{"color":"red","name":"JFK/UMass","lat":42.320685,"lng":-71.052391},{"color":"red","name":"Savin Hill","lat":42.31129,"lng":-71.053331},{"color":"red","name":"Fields Corner","lat":42.300093,"lng":-71.061667},{"color":"red","name":"Shawmut","lat":42.29312583,"lng":-71.06573796},{"color":"red","name":"Ashmont","lat":42.284652,"lng":-71.064489},{"color":"red","name":"North Quincy","lat":42.275275,"lng":-71.029583},{"color":"red","name":"Wollaston","lat":42.2665139,"lng":-71.0203369},{"color":"red","name":"Quincy Center","lat":42.251809,"lng":-71.005409},{"color":"red","name":"Quincy Adams","lat":42.233391,"lng":-71.007153},{"color":"red","name":"Braintree","lat":42.2078543,"lng":-71.0011385}]';
					orange_positions = [];
					blue_positions = [];
					red_a_positions = [];
					red_b_positions = [];
					orange_markers = [];
					blue_markers = [];
					red_a_markers = [];
					orangeparsed = JSON.parse(orangelines);
					blueparsed = JSON.parse(blueLines);
					redparsed = JSON.parse(redLines);
					orange_icon = 'orange_icon1.png'; //I made these
					blue_icon = 'blue_icon.png';
					red_icon = 'red_icon1.png';
					if (color == 'orange'){     
						for (i=0; i < 19; i++)
						{
							marker_a = new google.maps.LatLng(orangeparsed[i].lat, orangeparsed[i].lng);
							orange_positions.push(marker_a);
							var station_name = orangeparsed[i].name;
							//stops(scheduleData, station_name);
							marker_set(marker_a, station_name, orange_icon, scheduleData);
						} 
						for (i = 0; i<orange_markers.length;i++) {
							orange_markers[i].setMap(map);
						}

						orangePolyLine= new google.maps.Polyline({
	    					path: orange_positions,
						    geodesic: true,
	    					strokeColor: '#e08f11',
	    					strokeOpacity: 1.0,
						    strokeWeight: 2
						  });
						orangePolyLine.setMap(map);
					closestStation(orangeparsed);
					}

					if (color == 'blue'){
						for (i=0; i < 12; i++)
						{
							marker_b = new google.maps.LatLng(blueparsed[i].lat, blueparsed[i].lng);
							blue_positions.push(marker_b);
							var station_name = blueparsed[i].name;
							marker_set(marker_b, station_name, blue_icon, scheduleData);
							/*blue_markers.push(new google.maps.Marker({
								position: marker_b,
								title: "Station",
								icon: blue_icon,
							}));*/

						} 
						for (i = 0; i<blue_markers.length;i++) {
							blue_markers[i].setMap(map);
						}
						bluePolyLine= new google.maps.Polyline({
	    					path: blue_positions,
						    geodesic: true,
	    					strokeColor: '#1313dd',
	    					strokeOpacity: 1.0,
						    strokeWeight: 2
						  });
						bluePolyLine.setMap(map);
						closestStation(blueparsed);
					}

					if (color == 'red'){     
						for (i=0; i < 22; i++)
						{
							marker_c = new google.maps.LatLng(redparsed[i].lat, redparsed[i].lng);
							var station_name = redparsed[i].name;
							marker_set(marker_c, station_name, red_icon, scheduleData);
							/*red_a_markers.push(new google.maps.Marker({
								position: marker_c,
								title: "Station",
								icon: red_icon,
							}));
							google.maps.event.addListener(red_a_markers[i], 'click', function() {
							infowindow.setContent("hi");
							infowindow.open(map, this);
							});*/
						} 
						for (i=0; i < 17; i++) //Map the first fork of the red line
						{
						marker_d = new google.maps.LatLng(redparsed[i].lat, redparsed[i].lng);
						red_a_positions.push(marker_d);
						}
						//Map the second fork of the red line:
						test_marker = new google.maps.LatLng(redparsed[12].lat, redparsed[12].lng)
						red_b_positions.push(test_marker);
						for (i=17; i < 22; i++)
						{
						marker_e = new google.maps.LatLng(redparsed[i].lat, redparsed[i].lng);
						red_b_positions.push(marker_e);
						}
						for (i = 0; i<red_a_markers.length;i++) {

							red_a_markers[i].setMap(map);
						}
						redPolyLineA= new google.maps.Polyline({
	    					path: red_a_positions,
						    geodesic: true,
	    					strokeColor: '#f81313',
	    					strokeOpacity: 1.0,
						    strokeWeight: 2
						  });
						redPolyLineA.setMap(map);

						redPolyLineB= new google.maps.Polyline({
	    					path: red_b_positions,
						    geodesic: true,
	    					strokeColor: '#f81313',
	    					strokeOpacity: 1.0,
						    strokeWeight: 2
						  });
						redPolyLineB.setMap(map);
						closestStation(redparsed);
					}
			}

				function marker_set(marker_location, name, icon, scheduleData)
				{
					var marker = new google.maps.Marker({
					map: map,
					position: marker_location,
					icon: icon,
					});
					google.maps.event.addListener(marker, 'click', function() {
					infowindow.close();
					infowindow.setContent(stops(scheduleData, name));
					infowindow.open(map, this);
					});
				}

			function stops(scheduleData, station_name){
				var scheduleInformation = "Station name: " + station_name + "<br>" + "<table><tr><td>Direction</td> <td>Schedule</td></tr>"
				for (var i = 0; i < scheduleData["schedule"].length; i++)
				{
					var trip = scheduleData["schedule"][i];
					var predictions = trip["Predictions"];
					for (var j = 0; j < predictions.length; j++){
						var stationThis = predictions[j];
						if (stationThis["Stop"] == station_name){ //or is this just stationThis ==
							//The info box for station["stop"] gets the direction and the time remaining
							scheduleInformation += "<tr><td>" + trip["Destination"] + "</td><td>" + stationThis["Seconds"]/60 + "</td></tr>";
						}
					}
				}
				scheduleInformation += "</table>";
				return scheduleInformation;
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
			}
			
			function toggleBounce() {
			//From https://developers.google.com/maps/documentation/javascript/markers:
  				if (marker.getAnimation() != null) {
    				marker.setAnimation(null);
  				} else {
    				marker.setAnimation(google.maps.Animation.BOUNCE);
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

			function closestStation(stations){

				if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser
					navigator.geolocation.getCurrentPosition(function(position) {
						var userLat = position.coords.latitude;
						var userLng = position.coords.longitude;
						me = new google.maps.LatLng(userLat, userLng);
						closest = stations[0];
						lat1 = userLat;
						lng1 = userLng;
						smallestDist = distance(lat1, closest.lat, lng1, closest.lng);
						for (i = 0; i < stations.length; i++)
						{
							lat2 = stations[i].lat;
							lng2 = stations[i].lng;
							newDist = distance(lat2, lat1, lng2, lng1);
							if (newDist < smallestDist)
								{
									smallestDist = newDist;
									closest = stations[i];
								}
						}
						var closestStationCoord = new google.maps.LatLng(closest.lat, closest.lng);

						smallestDist = smallestDist * .621371;

						closestStationLine = new google.maps.Polyline({
		    					path: [me, closestStationCoord],
							    geodesic: true,
		    					strokeColor: '#000000',
		    					strokeOpacity: .7,
							    strokeWeight: 2
							  });
						closestStationLine.setMap(map);
						// Update map and go there...
						map.panTo(me);
						var icon_image = 'elephant.png';
						// Create a marker
						marker = new google.maps.Marker({
							position: me,
							title: "Current location",
							icon: icon_image, 	//Elephant image comes from https://cdn4.iconfinder.com/data/icons/48x48-free-object-icons/48/Elephant.png
							animation: google.maps.Animation.DROP
						});

						marker.setMap(map);
						google.maps.event.addListener(marker, 'click', toggleBounce);

						// Open info window on click of marker
						google.maps.event.addListener(marker, 'click', function() {
							infowindow.setContent(marker.title + "<br> Miles to nearest station (" + closest.name + "): " + smallestDist);
							infowindow.open(map, marker);
						});
					});
				}
				else {
					alert("Geolocation is not supported by your web browser.");
				}
			}

			function distance(lat2, lat1, lon2, lon1){
				var R = 6371; // km
				var dLat = (lat2-lat1).toRad();
				var dLon = (lon2-lon1).toRad();
				var lat1 = lat1.toRad();
				var lat2 = lat2.toRad();

				var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
				        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
				var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
				var d = R * c;
				return d;
			}