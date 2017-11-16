import React, { Component } from 'react'
import './App.css'

import OpenStreetMap from './OpenStreetMap'
//   <OpenStreetMap id="mapid" zoom = {9} max_zoom = {23}  coordinates = {[48.66833, 2.36206]}/> 

class App extends Component {
  render() {
    return (
      <div className="App"> 
           <OpenStreetMap  id="mapid" zoom = {8} max_zoom = {23}  coordinates = {[48.66833, 2.36206]}/>             
      </div>
    )
  }
}
 
export default App