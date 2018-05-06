mapboxgl.accessToken = 'pk.eyJ1IjoiY2NsYiIsImEiOiJjaXVpN2kyaDIwMHN3MnRydXY2ZGpxN2tiIn0.2DjZvLsMgvMhV1-OLA3gCA';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/cclb/cjgv9ghdg001j2rp3ckt4hjqu',
    center: [-79.3837, 42.2918],
    zoom: 9,
    minZoom: 9
});

map.on('load', function () {

    map.addLayer({
        "id": "foreclosures",
        "type": "fill",
        "source": {
            type: 'vector',
            url: 'mapbox://cclb.cjgv6qfpn024sbcln75x1bn13-6o38r'
        },
        "source-layer": "2018_foreclosures"
    });
});
