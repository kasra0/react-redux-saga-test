import React, { Component } from 'react'
import './css/App.css'

import OpenStreetMap from './components/OpenStreetMap'
import AppBar        from './components/widgets/AppBar'



class App extends Component {
  render() {
    return (
      <div>  
            <AppBar/>
            <div className="App">          
               <OpenStreetMap  id="mapid" zoom = {8} max_zoom = {23}  coordinates = {[48.66833, 2.36206]}/>             
            </div>     
      </div> 
    )
  }
}
 
export default App