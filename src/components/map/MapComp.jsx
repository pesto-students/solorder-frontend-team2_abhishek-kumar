import React from 'react'
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import commonStore from '../../zustang/common/commonStore';

var map = null
var marker = null
function MapComp({ Addlat, Addlng, setData }) {
  const { notify } = commonStore(s => s)
  const [defaultlatLng, setDefaultlatLng] = React.useState({ lngLat: [77.589738, 21.651046], zoom: 3 })

  React.useEffect(() => {
    const key = 'bxi5LpQiIsNb1oXS3opQ';
    map = new maplibregl.Map({
      container: 'map', // container's id or the HTML element in which MapLibre GL JS will render the map
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${key}`, // style URL
      center: defaultlatLng.lngLat, // starting position [lng, lat]
      zoom: defaultlatLng.zoom, // starting zoom
    });
    map.addControl(new maplibregl.NavigationControl(), 'bottom-right');
    marker = new maplibregl.Marker({ draggable: true }).setLngLat([77.589738, 21.651046]).addTo(map);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let latitude = position?.coords?.latitude || 0
        let longitude = position?.coords?.longitude || 0
        map.setCenter([longitude, latitude])
        marker.setLngLat([longitude, latitude])
        map.setZoom(10)
        setDefaultlatLng({ lngLat: [longitude, latitude], zoom: 10 })
      });
    }
    marker.on('dragend', onDragEnd);
    // map.on('click', onMapClick);
    map.on('error', function (err) {
      notify("Error occured on map loading.", "error")
    });
  }, []);

  React.useEffect(() => {
    if (Addlng && Addlat) {
      marker.setLngLat([Number(Addlng), Number(Addlat)])
      map.setCenter([Number(Addlng), Number(Addlat)])
      map.setZoom(10)
    } else {
      marker.setLngLat(defaultlatLng.lngLat)
      map.setCenter(defaultlatLng.lngLat)
      map.setZoom(defaultlatLng.zoom)
    }
  }, [Addlat, Addlng])

  function onDragEnd() {
    var lngLat = marker.getLngLat();
    setData({ ...lngLat })
    map.setCenter(lngLat)
  }

  // function onMapClick(e) {
  //   var lngLat = e.lngLat
  //   setData({ ...lngLat })
  //   map.setCenter(lngLat)
  // }

  return (
    <Box sx={{ width: "90%", height: "50vh" }}>
      <p style={{ marginBottom: "2px", color: "red" }}>*Drag marker to accurate place.</p>
      <div id="map" style={{ height: "95%", width: "100%" }}></div>
    </Box>
  );
}

export default MapComp;