/* global d3, dayjs, mapboxgl */

// Replace this with your own access token
mapboxgl.accessToken = 'pk.eyJ1IjoiZWJyZWxzZm9yZCIsImEiOiI2VFFWT21ZIn0.qhtAhoVTOPzFwWAi7YHr_Q';

// Initialize the map with its settings
const mainMap = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/ebrelsford/cjmh56y2b2zlu2rs0vbxvfcew',
  center: [-97.2972, 38.3924],
  zoom: 4
});

// Initialize the map with its settings
const insetMap = new mapboxgl.Map({
  container: 'map-inset',
  interactive: false,
  style: 'mapbox://styles/ebrelsford/cjmh56y2b2zlu2rs0vbxvfcew',
  center: [-157.2391, 20.9024],
  zoom: 4.5
});

const maps = [mainMap, insetMap];

const jeromeCoordinates = [-91.4557, 35.4263];
let dateExtent;
let dateRange;

document.querySelector('#map-inset').addEventListener('click', () => {
  mainMap.flyTo({
    center: [-157.2391, 20.9024],
    zoom: 7
  });
});

document.querySelector('.preevacuation').addEventListener('change', e => {
  maps.forEach(map => {
    map.setLayoutProperty('preevacuation-points', 'visibility', e.target.checked ? 'visible' : 'none');
    map.setLayoutProperty('preevacuation-lines', 'visibility', e.target.checked ? 'visible' : 'none');
  });
});

document.querySelector('.final-departure').addEventListener('change', e => {
  maps.forEach(map => {
    map.setLayoutProperty('destination-points', 'visibility', e.target.checked ? 'visible' : 'none');
    map.setLayoutProperty('destination-lines', 'visibility', e.target.checked ? 'visible' : 'none');
  });
});

const dateSlider = document.querySelector('.departure-date-slider');
dateSlider.addEventListener('change', () => {
  const previousDate = dateRange[dateSlider.value - 1] || dateExtent[0];
  const selectedDate = dateRange[dateSlider.value];
  
  document.querySelector('.departure-date-selected').innerHTML = dayjs(previousDate).format('MMM YYYY');
  map.setFilter('destination-lines', 
    ['all',
      ['>=', ['get', 'date'], previousDate.toISOString()],
      ['<', ['get', 'date'], selectedDate.toISOString()]
    ]
  );
});

maps.forEach(map => {
  map.on('load', function () {
    map.addSource('jerome', {
      'type': 'geojson',
      'data': {
        type: 'FeatureCollection',
        features: [
          {
            'type': 'Feature',
            'geometry': {
              'type': 'Point',
              'coordinates': jeromeCoordinates
            }
          }
        ]
      }
    });
    
    map.addLayer({
      'id': 'jerome',
      'type': 'circle',
      'source': 'jerome',
      'paint': {
        'circle-radius': 10,
          'circle-color': '#e64cce'
      }
    });
    
    d3.csv('./jerome.csv')
      .then(data => {
        const transformed = data.map(row => {
          return {
            preevacuation_latitude: +row.preevacuation_latitude,
            preevacuation_longitude: +row.preevacuation_longitude,
            departure_latitude: +row.departure_latitude,
            departure_longitude: +row.departure_longitude,
            date_of_final_departure: dayjs(row.date_of_final_departure).toDate()
          };
        });
      
        dateExtent = d3.extent(transformed.map(d => d.date_of_final_departure));
        dateRange = d3.timeMonth.range(...dateExtent);
        dateSlider.setAttribute('max', dateRange.length - 1);
      
        const preevacuationPoints = {
          type: 'FeatureCollection',
          features: transformed
            .filter(row => row.preevacuation_longitude && row.preevacuation_latitude)
            .map(row => ({
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'Point',
                coordinates: [
                  row.preevacuation_longitude,
                  row.preevacuation_latitude
                ]
              }
            }))
        };
      
        map.addSource('preevacuation-points', {
          'type': 'geojson',
          'data': preevacuationPoints
        });

        map.addLayer({
          'id': 'preevacuation-points',
          'type': 'circle',
          'source': 'preevacuation-points',
          'paint': {
            'circle-radius': 3,
            'circle-color': '#8358e0'
          }
        });
      
        const preevacuationLines = preevacuationPoints.features
          .filter(f => !!f.geometry)
          .map(f => ({
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: [
                f.geometry.coordinates,
                jeromeCoordinates,
              ]
            }
          }));
      
        map.addSource('preevacuation-lines', {
          'type': 'geojson',
          'data': {
            type: 'FeatureCollection',
            features: preevacuationLines
          }
        });

        map.addLayer({
          'id': 'preevacuation-lines',
          'type': 'line',
          'source': 'preevacuation-lines',
          'paint': {
            'line-width': 1,
            'line-color': '#8358e0',
            'line-opacity': 0.1
          }
        }, 'jerome');
        
      
        const destinationPoints = {
          type: 'FeatureCollection',
          features: transformed
            .filter(row => row.departure_longitude && row.departure_latitude)
            .map(row => ({
              type: 'Feature',
              properties: {
                date: row.date_of_final_departure.toISOString()
              },
              geometry: {
                type: 'Point',
                coordinates: [
                  row.departure_longitude,
                  row.departure_latitude
                ]
              }
            }))
        };
      
        map.addSource('destination-points', {
          'type': 'geojson',
          'data': destinationPoints
        });

        map.addLayer({
          'id': 'destination-points',
          'type': 'circle',
          'source': 'destination-points',
          'paint': {
            'circle-radius': 3,
            'circle-color': '#15bfbc'
          }
        });
      
        const destinationLines = destinationPoints.features
          .filter(f => !!f.geometry)
          .map(f => ({
            type: 'Feature',
            properties: {
              date: f.properties.date
            },
            geometry: {
              type: 'LineString',
              coordinates: [
                jeromeCoordinates,
                f.geometry.coordinates,
              ]
            }
          }));
      
        map.addSource('destination-lines', {
          'type': 'geojson',
          'data': {
            type: 'FeatureCollection',
            features: destinationLines
          }
        });

        map.addLayer({
          'id': 'destination-lines',
          'type': 'line',
          'source': 'destination-lines',
          'paint': {
            'line-width': 1,
            'line-color': '#1c8a88',
            'line-opacity': 0.5
          }
        }, 'jerome');
      
      });
  });
});
