import React, { Component }                  from 'react'
import {grey, amber, red}                    from 'material-ui/colors'
import './css/App.css'
import { withStyles,createMuiTheme,spacing } from 'material-ui/styles';
import AppBar                                from './components/widgets/AppBar'
import EquipmentsFilter                      from './components/EquipmentsFilter'
import styles                                from './components/styles/default-style'
import {}                                    from './components/widgets/SimpleSelect'

const muiTheme = createMuiTheme({
  spacing : {unit : 8},
	palette: {
		primary: grey,
		accent: amber,
		error: red,
		type: 'dark'
  }  
})

let items = [
  {value: "1" ,      text :"text1" },
  {value: "2" ,      text :"text2" },
  {value: "3" ,     text :"text3" }         
 ]

let MyForm = withStyles(styles.select_style)(EquipmentsFilter)
class App extends Component {
  render() {
    return (
      <div>  
          <AppBar/>       
          <MyForm items={items} property_name={"department"}/>
      </div> 
    )
  }
}
export default App