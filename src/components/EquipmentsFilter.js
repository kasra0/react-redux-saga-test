import PropTypes                       from 'prop-types';
import React                           from 'react';
import {bindActionCreators}            from 'redux'
import {connect}                       from 'react-redux';
import {runSaga}                       from 'redux-saga'

import qs                              from 'qs'

import { withStyles }                  from 'material-ui/styles';
import Input, { InputLabel }           from 'material-ui/Input';
import { MenuItem }                    from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Button                          from 'material-ui/Button';
import Select                          from 'material-ui/Select';
import Paper                           from 'material-ui/Paper';
import Grid                            from 'material-ui/Grid';

import {equipment,equipments}          from './../redux/actions';
                            

class EquipmentsFilter extends React.Component{

    constructor(props){ 
        super(props)   
        this.state = {
            [this.props.property_name] : 'none',        
          };
        this.handle_change = this.handle_change.bind(this)
        this.handle_click  = this.handle_click.bind(this)
    }

    handle_change = property_name => event => { 
        this.setState({ [property_name]: event.target.value });      
      };
    handle_click(){     
        let param = this.state[this.props.property_name]  
        console.log("click event",param)
        let dispatch = this.props.actions.equipments(param,[])       
    }
    render(){       
       return (         
                <Grid container item xs={12} sm={6} alignItems={"center"} direction={"row"} justify={"space-around"} >           
                   <form className={this.props.classes.container} autoComplete="off">
                    <FormControl className={this.props.classes.formControl}>
                    <InputLabel htmlFor={this.props.id}>Equipments</InputLabel>
                    <Select value={this.state[this.props.property_name]} onChange={this.handle_change(this.props.property_name)} input={<Input id={this.props.id} />}>
                        <MenuItem value="">
                        <em>None</em>
                        </MenuItem>
                        {this.props.items.map((item,key)=>{
                        return  (<MenuItem key={key} value={item.value} item>{item.text}</MenuItem>)        
                        })}
                    </Select>
                    </FormControl> 
                    <Button raised className = {this.props.classes.button} onClick={this.handle_click}>search</Button>      
                    </form>  
                                  
                </Grid> 
       )
    }
}
EquipmentsFilter.propTypes = {
    actions : PropTypes.object
}
const map_state_to_props = (state,own_props)=>{ 
    let equipments  = state.equipments 
   return {
       equipments
   }
}
const map_dispatch_to_props = (dispatch)=>{   
    let actions = bindActionCreators({equipment,equipments},dispatch) 
    return {
        actions
    }
}
export default connect(map_state_to_props,map_dispatch_to_props)(EquipmentsFilter)





