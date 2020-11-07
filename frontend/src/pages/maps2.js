import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
  LoadScript,
  withScriptjs,
  withGoogleMap,  
  Marker 
} from '@react-google-maps/api';

const ExampleDirectionsPropTypes = {
  styles: PropTypes.shape({
    container: PropTypes.object.isRequired,
  }).isRequired,
}

const center = {
  lat: 0,
  lng: -180,
}

class ExampleDirections extends Component {
  static propTypes = ExampleDirectionsPropTypes

  state = {
    response: null,
    travelMode: 'DRIVING',
    origin: '',
    destination: '',
  }

  directionsCallback = response => {
   //console.log(response)

    if (response !== null) {
      if (response.status === 'OK') {
        this.setState(() => ({
          response,
        }))
      } else {
        console.log('response: ', response)
      }
    }
  }

  /*checkDriving = ({ target: { checked } }) => {
    checked &&
      this.setState(() => ({
        travelMode: 'DRIVING',
      }))
  }*/

  getOrigin = ref => {
    this.origin = ref
  }

  getDestination = ref => {
    this.destination = ref
  }

  onClick = () => {
    console.log('origem '+this.origin.value)
    console.log('destino '+this.destination.value)

    if (this.origin.value !== '' && this.destination.value !== '') {
      this.setState(() => ({
        origin: this.origin.value,
        destination: this.destination.value,
      }))
    }
  }

  onMapClick = (...args) => {
    console.log('onClick args: ', args)
  }

  render = () => (
    <div className='map'>
      <div className='map-settings'>
        <hr className='mt-0 mb-3' />

        <div className='row'>
          <div className='col-md-6 col-lg-4'>
            <div className='form-group'>
              <label htmlFor='ORIGIN'>Origin</label>
              <br />
              <input
                id='ORIGIN'
                className='form-control'
                type='text'
                ref={this.getOrigin}
              />
            </div>
          </div>

          <div className='col-md-6 col-lg-4'>
            <div className='form-group'>
              <label htmlFor='DESTINATION'>Destination</label>
              <br />
              <input
                id='DESTINATION'
                className='form-control'
                type='text'
                ref={this.getDestination}
              />
            </div>
          </div>
        </div>       

        <button
          className='btn btn-primary'
          type='button'
          onClick={this.onClick}
        >
          Build Route
        </button>
      </div>

      <div className='map-container'>     
      <LoadScript
      googleMapsApiKey="AIzaSyBcFfTH-U8J-i5To2vZ3V839pPaeZ59bQ4"
    >
        <GoogleMap
          id='direction-example'
         // mapContainerStyle={this.props.styles.container}
          zoom={2}
          center={center}
          onClick={this.onMapClick}
        >
          {this.state.destination !== '' && this.state.origin !== '' && (
            <DirectionsService
          
              options={{
                destination: this.state.destination,
                origin: this.state.origin,
                travelMode: this.state.travelMode,
              }}
              callback={this.directionsCallback}
            />
          )}

          {this.state.response !== null && (
            <DirectionsRenderer
    
              options={{
                directions: this.state.response,
              }}
            />
          )}
        </GoogleMap>      
       </LoadScript>
      </div>
    </div>
  )
}

export default ExampleDirections