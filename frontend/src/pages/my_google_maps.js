import React, { useState, useCallback }  from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';
 
const containerStyle = {
  width: '400px',
  height: '400px'
};
 
const center = {
  lat: -22.955,
  lng: -42.061
};

function MyComponent() {
//const myComponent = props => { 
//class myComponent extends React.Component {
//function MyComponent() {    
    const [map, setMap] = React.useState(null)
 
    const onLoad = React.useCallback(function callback(map) {
      const bounds = new window.google.maps.LatLngBounds();
      map.fitBounds(bounds);
      setMap(map)
    }, [])
   
    const onUnmount = React.useCallback(function callback(map) {
      setMap(null)
    }, [])
 
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyBTKs9MVXMJsl4GxSLtWnSnVbSs8hhL2p8"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
    </LoadScript>
  )
}
 
export default MyComponent;
//export default React.memo(myComponent)