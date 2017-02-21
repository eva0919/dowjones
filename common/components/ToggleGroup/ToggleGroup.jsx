import React, { Component, PropTypes } from 'react';
import Toggle from 'material-ui/Toggle';


class ToggleGroup extends Component{

  render(){
    const styles = {
      root:{
        marginLeft:"20px"
      },
      toggle:{
        display:"inline-block",
        width:"100px"

      }
    }
    return (
      <div style={styles.root}>
      <Toggle
        label="High"
        defaultToggled={true}
        labelPosition="right"
        style={styles.toggle}
      />
      <Toggle
        label="Low"
        labelPosition="right"
        style={styles.toggle}
      />
      <Toggle
        label="Open"
        labelPosition="right"
        style={styles.toggle}
      />
      <Toggle
        label="Close"
        labelPosition="right"
        style={styles.toggle}
      />
      </div>
    )
  }
}

export default ToggleGroup;
