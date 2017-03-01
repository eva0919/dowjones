import React, { Component, PropTypes } from 'react';
import Toggle from 'material-ui/Toggle';
import _ from 'lodash';
import {getColorByIndex} from '../../utils/colors'
class ToggleGroup extends Component{

  render(){
    console.log( this.props );
    const styles = {
      root:{
        marginLeft:"20px",
        marginBottom: "20px"
      },
      toggle:{
        display:"inline-block",
        width:"100px"

      }
    }
    var nodes = null;
    if( this.props.toggleOption ){
      let thumbSwitchedArray = [];
      let trackSwitchedArray = [];
      let toggleOptionArray = _.keys(this.props.toggleOption);
      this.props.handleGroup.forEach( (element, index, array) =>{
          thumbSwitchedArray.push( {backgroundColor: getColorByIndex(index)} );
          trackSwitchedArray.push({
            opacity: "0.3",
            backgroundColor:getColorByIndex(index)
          });
      });
      nodes = this.props.handleGroup.map( (value,key) => {
        let defaultToggle = false;
        if( key == 0 ){
          defaultToggle = true;
        }
        return <Toggle
                  label={toggleOptionArray[key]}
                  defaultToggled={defaultToggle}
                  labelPosition="right"
                  style={styles.toggle}
                  thumbSwitchedStyle={thumbSwitchedArray[key]}
                  trackSwitchedStyle={trackSwitchedArray[key]}
                  onToggle={value}
                  />
      });
    }
    return (
      <div style={styles.root}>
      {nodes}
      </div>
    )
  }
}

export default ToggleGroup;
