import React                           from 'react';
import PropTypes                       from 'prop-types';
//import { withStyles }                  from 'material-ui/styles';
import Input, { InputLabel }           from 'material-ui/Input';
import { MenuItem }                    from 'material-ui/Menu';
import { FormControl }                 from 'material-ui/Form';
import Select                          from 'material-ui/Select';


class SimpleSelect extends React.Component {
    state = {
        age: '',
        name: 'hai',
      };

  
    handleChange = property_name => event => { 
      this.setState({ [property_name]: event.target.value });      
    };
  
    render() { 
      const { classes } = this.props;  
      return (
        <form className={classes.container} autoComplete="off">
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor={this.props.id}>Equipments</InputLabel>
            <Select value={this.state.age} onChange={this.handleChange('age')} input={<Input id={this.props.id} />}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {this.props.items.map((item,key)=>{
               return  (<MenuItem key={key} value={item.value} item>{item.text}</MenuItem>)        
              })}
            </Select>
          </FormControl>       
        </form>
      );
    }
  }
  
  SimpleSelect.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default SimpleSelect

