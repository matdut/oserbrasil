import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

class Map extends Component {
  constructor() {
    super();
    this.state = {
      map: null
    }
  }

  mapMoved() {
   // console.log('mapMoved: '+ JSON.stringify(this.state.map.getCenter()));
  }

  mapLoaded(map) {
    if(this.state.map !== null) {
      return;
    }

    console.log("here: " + JSON.stringify(this.props.center));

    this.setState({
      map: map
    });
  }

  render() {
    const markers = this.props.markers || []
    console.log("reload");
    return (
        <GoogleMap
          ref={this.mapLoaded.bind(this)}
          onDragEnd={this.mapMoved.bind(this)}
          defaultZoom={this.props.zoom}
          defaultCenter={this.props.center}>
          {markers.map((marker, index) => (
              <Marker {...marker} />
            )
          )}
        </GoogleMap>
    );
  }
}

export default withGoogleMap(Map)