mapboxgl.accessToken = 'pk.eyJ1IjoiY2NsYiIsImEiOiJjaXVpN2kyaDIwMHN3MnRydXY2ZGpxN2tiIn0.2DjZvLsMgvMhV1-OLA3gCA';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/cclb/cjgv9ghdg001j2rp3ckt4hjqu',
    center: [-79.2378329, 42.0959304],
    zoom: 14,
    minZoom: 10
});

map.addControl(new MapboxGeocoder({
    accessToken: mapboxgl.accessToken
}));

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
          [4999, 'rgba(0,0,0,0)'],
          [5000, 'green'],
          [100000, 'red'],
          [100001, 'rgba(0,0,0,0)']
        ]
      },
      'fill-outline-color': '#ffffff',
      'fill-opacity': 1
    }
  });

  map.addLayer({
    "id": "vacant_lots",
    "type": "fill",
    "source": {
      type: 'vector',
      url: 'mapbox://cclb.cjgv6hkfl049aasn2swskdmdt-1d2ot'
    },
    "source-layer": "2018_vacant_lots",
    'paint': {
      'fill-color': 'orange',
      'fill-outline-color': '#ffffff',
      'fill-opacity': 1
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


// Contol the menu
var toggleableLayerIds = [ 'foreclosures', 'vacant_lots' ];

for (var i = 0; i < toggleableLayerIds.length; i++) {
    var id = toggleableLayerIds[i];

    var link = document.createElement('a');
    link.href = '#';
    link.className = 'active';
    link.textContent = id;

    link.onclick = function (e) {
        var clickedLayer = this.textContent;
        e.preventDefault();
        e.stopPropagation();

        var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

        if (visibility === 'visible') {
            map.setLayoutProperty(clickedLayer, 'visibility', 'none');
            this.className = '';
        } else {
            this.className = 'active';
            map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
        }
    };

    var layers = document.getElementById('menu');
    layers.appendChild(link);
}
