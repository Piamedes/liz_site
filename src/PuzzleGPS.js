import React from 'react';

class PuzzleGPS extends React.Component {
  constructor(props) {
    super(props);
    
    this.updateLocation = this.updateLocation.bind(this);
    
    this.state = { 
      latitude:  0,
      longitude: 0,
      watchId:   navigator.geolocation.watchPosition(this.updateLocation),
    };
  }

  updateLocation(position){
    this.setState({
        latitude:  position.coords.latitude,
        longitude: position.coords.longitude,
    })
  }

  render() {
    return (
      <div> 
        <div className="container">
          <p> {'your location is '+this.state.latitude}</p>
        </div>
      </div>
    );
  }
}


export default PuzzleGPS;