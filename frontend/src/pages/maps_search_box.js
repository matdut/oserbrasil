import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import '../../App.css';
import Driver from './Driver';
import Passenger from './Passenger';
import SearchBox from './SearchBox';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      apiReady: false,
      map: null,
      googlemaps: null
    };
  }

  static defaultProps = {
    center: {
      lat: 6.92,
      lng: 79.86
    },
    zoom: 15,
  };

  handleApiLoaded = (map, maps) => {
    // use map and maps objects
    if (map && maps) {
      this.setState({
        apiReady: true,
        map: map,
        googlemaps: maps
      });
    }
  };

  render({ apiReady, googlemaps, map } = this.state) {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBcFfTH-U8J-i5To2vZ3V839pPaeZ59bQ4', libraries: ['places'] }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
        >
          <Driver
            lat={6.8972152}
            lng={79.8541014}
          />
          <Passenger
            lat={6.9272012}
            lng={79.8681316}
          />

          {apiReady && (<SearchBox
            //  placeholder={"123 anywhere st."}
            //  onPlacesChanged={this.handleSearch} 
            map={map}
            googlemaps={googlemaps} />)}
        </GoogleMapReact>
      </div>
      )
  }
}

export default App