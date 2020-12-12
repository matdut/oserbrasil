import React, { Component } from 'react';
//import GoogleMapReact from 'google-map-react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import api from '../services/api';

const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
class React_maps extends Component {
  constructor(props) {
    super(props);  
  }

  displayMarkers = () => {
    return this.state.stores.map((store, index) => {
      return <Marker key={index} id={index} position={{
       lat: store.latitude,
       lng: store.longitude
     }}
     onClick={() => console.log("You clicked me!")} />
    })
  }

  render() {
    return (
     dddd
    );
  }
}
 
export default React_maps;