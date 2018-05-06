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
    "source-layer": "2018_foreclosures",
    'paint': {
      'fill-color': {
        property: "Sale_Price",
        stops: [
          [4999, '#000000'],
          [5000, '#38e54a'],
          [100000, '#ff1f1f'],
          [100001, '#000000']
        ]
      },
      'fill-outline-color': '#ffffff',
      'fill-opacity': 0.7
    }
  });
});

// When a click event occurs near a polygon, open a popup at the location of
// the feature, with description HTML from its properties.
map.on('click', function (e) {
    var features = map.queryRenderedFeatures(e.point, { layers: ['foreclosures'] });
    if (!features.length) {
        return;
    }
    var feature = features[0];
    var popup = new mapboxgl.Popup()
        .setLngLat(map.unproject(e.point))
        .setHTML('<p><strong>Sale Price:</strong> $' + feature.properties["Sale_Price"] + '</p>')
        .addTo(map);
});
// Use the same approach as above to indicate that the symbols are clickable
// by changing the cursor style to 'pointer'.
map.on('mousemove', function (e) {
    var features = map.queryRenderedFeatures(e.point, { layers: ['foreclosures'] });
    map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
});
