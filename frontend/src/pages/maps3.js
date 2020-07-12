import React from "react";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends React.Component {
    constructor(props){
        super(props);    
          this.state = {
            selectedPlace: "ARARUAMA",            
          }
          
        }    

  render() {
    return (
      <Map google={this.props.google} zoom={14}>

        <Marker onClick={this.onMarkerClick}
                name={"ARARUAMA/RJ"} />

        <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>{this.state.selectedPlace}</h1>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBTKs9MVXMJsl4GxSLtWnSnVbSs8hhL2p8"
})(MapContainer)