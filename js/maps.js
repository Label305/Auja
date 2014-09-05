$(document).ready(function() { 

/*
 * Load map with special nice grain
 */
if($('.maps-content').length > 0) {
    
    //Init map
    var mapOptions = {
        zoom: 8,
        streetViewControl: false,
        panControl: false,
        mapTypeControl: false,
        zoomControl: false,
        scrollwheel: false,
        styles : 
        [
            {
                featureType:'all',
            stylers:
                [
                    {saturation:-100},
                    {lightness: 10},
                    {gamma:0.0}
                ]
            }
        ],
        center: new google.maps.LatLng(52.222722,6.871240),
        mapTypeId: google.maps.MapTypeId.TERRAIN
    };
    map = new google.maps.Map($('.maps-content')[0], mapOptions);

    var icon = {
        url: '../img/maps-pointer.png',
        size: new google.maps.Size(145, 125),
        anchor: new google.maps.Point(41, 125)
    };

    /*
     * Add huuge marker
     */
        var markerOptions = {
            map: map,
            icon: icon,
            position: new google.maps.LatLng(52.222722,6.871240)
        };
        new google.maps.Marker(markerOptions);

    };
});

//TODO: Add responsiveness on window resize

