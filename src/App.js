import React, {useState} from 'react';

// import react-google-maps
// withScriptjs is a function that embeds the Google Script on the page that it needs to load for the map to work correctly
import {GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow} from 'react-google-maps';

import * as parksData from "./data/skateboard-parks.json";

function Map() {

  // state of the park you are currently clicked on
  // selectedPark = value of our state
  // setSelectedPark = setter of our state
  // default state is NULL
  const [selectedPark, setSelectedPark] = useState(null);

  return (
    // defaultZoom = determines how far in the map will be zoomed when it loads the first time
    // defaultCenter  = where it's going to position the map when it first renders
    <GoogleMap
      defaultZoom={10} 
      defaultCenter={{ lat: 45.4211, lng: -75.6903 }} // lat and longitude to ottawa, canada
    >
        {/* mapthrough the parks.json inside the features object */}
        {parksData.features.map((park) => (
          // mark the skate parks on the map through their coordinates
          <Marker 
            key={park.properties.PARK_ID} 
            position={ {lat: park.geometry.coordinates[1], lng: park.geometry.coordinates[0]}}
            // set selected park to the park it is currently clicked on
            onClick={() => {setSelectedPark(park)}} 
            icon={{
              // change the map icons to skater icons
              url: '/skateboarding.svg', 
              // scale the size of the image
              scaledSize: new window.google.maps.Size(25, 25)}}
          />
        ))}

        {/* if the selected park is true, show the InfoWindow */}
        {selectedPark && (
          <InfoWindow
            position={ {lat: selectedPark.geometry.coordinates[1], 
            lng: selectedPark.geometry.coordinates[0]}}
            // pass a function to close the selectedpark back to null
            onCloseClick={() => {
              setSelectedPark(null);
            }}
          >
            <div>
              {/* show name of the park */}
              <h2>{selectedPark.properties.NAME}</h2>
              {/* show description of the park */}
              <p>{selectedPark.properties.DESCRIPTIO}</p>
            </div>
          </InfoWindow>
        )}
    </GoogleMap>
  );
}

// wrap the Map that you'll be rendering inside the withGoogleMap function
const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function App() {
  // pass the WrappedMap component inside our App.js
  // embed the API Key
  // the container, loading, map elements = which div is the google map going to render on the screen
  return <div style={{width: '100vw', height: '100vh'}}>
    <WrappedMap 
      googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_API_KEY}`}
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `100%` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    /> 
  </div>;
}
