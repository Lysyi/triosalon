$('.nav-item').click(function(){
  'use strict';
  $('html, body').animate({
    scrollTop: $( $(this).attr('href') ).offset().top
  }, 500);
  return false;
});

var directionsDisplay = new google.maps.DirectionsRenderer();
var directionsService = new google.maps.DirectionsService();
// arrays to hold copies of the markers and html used by the side_bar
// because the function closure trick doesnt work there
var gmarkers = [];
var htmls = [];

// arrays to hold variants of the info window html with get direction forms open
var toHtmls = [];
var fromHtmls = [];

// global "map" variable
var map = null;

var infowindow = new google.maps.InfoWindow({
  size: new google.maps.Size(150, 50)
});


function initialize() {
  'use strict';
  var location = new google.maps.LatLng(41.8953478, -87.627070);

  var mapOptions = {
    center: location,
    zoom: 15,
    scrollwheel: false
  };

  map = new google.maps.Map(document.getElementById('map'),
    mapOptions);

  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById('directionsPanel'));
  google.maps.event.addListener(map, 'click', function() {
    infowindow.close();
  });

  var marker = new google.maps.Marker({
    position: location,
    title: 'TRIO Salon, Ltd.',
    map: map,
    animation: google.maps.Animation.DROP
  });

  var i = gmarkers.length;
  var latlng = location;

  // The info window version with the "to here" form open
  toHtmls[i] = html + '<br>Directions: <b>To here<\/b> - <a href="javascript:fromhere(' + i + ')">From here<\/a>' +
    '<br>Start address:<form action="javascript:getDirections()">' +
    '<input type="text" SIZE=40 MAXLENGTH=40 name="saddr" id="saddr" value="" /><br>' +
    '<INPUT value="Get Directions" TYPE="button" onclick="getDirections()"><br>' +
    'Walk <input type="checkbox" name="walk" id="walk" /> &nbsp; Avoid Highways <input type="checkbox" name="highways" id="highways" />' +
    '<input type="hidden" id="daddr" value="' + latlng.lat() + ',' + latlng.lng() +
    '"/>';
  // The info window version with the "from here" form open
  fromHtmls[i] = html + '<br>Directions: <a href="javascript:tohere(' + i + ')">To here<\/a> - <b>From here<\/b>' +
    '<br>End address:<form action="javascript:getDirections()">' +
    '<input type="text" SIZE=40 MAXLENGTH=40 name="daddr" id="daddr" value="" /><br>' +
    '<INPUT value="Get Directions" TYPE="SUBMIT"><br>' +
    'Walk <input type="checkbox" name="walk" id="walk" /> &nbsp; Avoid Highways <input type="checkbox" name="highways" id="highways" />' +
    '<input type="hidden" id="saddr" value="' + latlng.lat() + ',' + latlng.lng() +
    '"/>';
  // The inactive version of the direction info
  var html = marker.getTitle() + '<br>Directions: <a href="javascript:tohere(' + i + ')">To here<\/a> - <a href="javascript:fromhere(' + i + ')">From here<\/a>';
  var contentString = html;

  google.maps.event.addListener(marker, 'click', function() {
    map.setZoom(15);
    map.setCenter(marker.getPosition());
    infowindow.setContent(contentString);
    infowindow.open(map, marker);
  });
  // save the info we need to use later for the side_bar
  gmarkers.push(marker);
  htmls[i] = html;
}

google.maps.event.addDomListener(window, 'load', initialize);

// ===== request the directions =====
function getDirections() {
  'use strict';
  // ==== Set up the walk and avoid highways options ====
  var request = {};
  if (document.getElementById('walk').checked) {
    request.travelMode = google.maps.DirectionsTravelMode.WALKING;
  } else {
    request.travelMode = google.maps.DirectionsTravelMode.DRIVING;
  }

  if (document.getElementById('highways').checked) {
    request.avoidHighways = true;
  }
  // ==== set the start and end locations ====
  var saddr = document.getElementById('saddr').value;
  var daddr = document.getElementById('daddr').value;

  request.origin = saddr;
  request.destination = daddr;
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    } else alert('Directions not found:' + status);
  });
}

// functions that open the directions forms
function tohere(i) {
  infowindow.setContent(toHtmls[i]);
  infowindow.open(map, gmarkers[i]);
}

function fromhere(i) {
  infowindow.setContent(fromHtmls[i]);
  infowindow.open(map, gmarkers[i]);
}

