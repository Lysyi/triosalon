

function initialize() {
  'use strict';
  // var styles = [{
  //   'featureType': 'all',
  //   'elementType': 'labels.text.fill',
  //   'stylers': [{'saturation': 36}, {'color': '#000000'}, {'lightness': 40}]}, {'featureType': 'all', 'elementType': 'labels.text.stroke', 'stylers': [{'visibility': 'on'}, {'color': '#000000'}, {'lightness': 16}]}, {'featureType': 'all', 'elementType': 'labels.icon', 'stylers': [{'visibility': 'off'}]}, {'featureType': 'administrative', 'elementType': 'geometry.fill', 'stylers': [{'color': '#000000'}, {'lightness': 20}]}, {'featureType': 'administrative', 'elementType': 'geometry.stroke', 'stylers': [{'color': '#000000'}, {'lightness': 17}, {'weight': 1.2}]}, {'featureType': 'landscape', 'elementType': 'geometry', 'stylers': [{'color': '#000000'}, {'lightness': 20}]}, {'featureType': 'poi', 'elementType': 'geometry', 'stylers': [{'color': '#000000'}, {'lightness': 21}]}, {'featureType': 'road.highway', 'elementType': 'geometry.fill', 'stylers': [{'color': '#000000'}, {'lightness': 17}]}, {'featureType': 'road.highway', 'elementType': 'geometry.stroke', 'stylers': [{'color': '#000000'}, {'lightness': 29}, {'weight': 0.2}]}, {'featureType': 'road.arterial', 'elementType': 'geometry', 'stylers': [{'color': '#000000'}, {'lightness': 18}]}, {'featureType': 'road.local', 'elementType': 'geometry', 'stylers': [{'color': '#000000'}, {'lightness': 16}]}, {'featureType': 'transit', 'elementType': 'geometry', 'stylers': [{'color': '#000000'}, {'lightness': 19}]}, {'featureType': 'water', 'elementType': 'geometry', 'stylers': [{'color': '#000000'}, {'lightness': 17}]}];
  // var styledMap = new google.maps.StyledMapType(styles,
  //   {name: 'Styled Map'});
  var bangalore = { lat: 41.8953478, lng: -87.627070 };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    // scrollwheel: false,
    center: bangalore,
    // disableDefaultUI: true
  });
  // map.mapTypes.set('map_style', styledMap);
  // map.setMapTypeId('map_style');
  addMarker(bangalore, map);
}

function addMarker(location, map) {
  'use strict';
  var marker = new google.maps.Marker({
    position: location,
    title: 'TRIO Salon, Ltd.',
    map: map
  });
}

google.maps.event.addDomListener(window, 'load', initialize);


$('.nav-item').click(function(){
  'use strict';
  $('html, body').animate({
      scrollTop: $( $(this).attr('href') ).offset().top
  }, 500);
  return false;
});
