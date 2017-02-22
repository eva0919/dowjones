import React, { Component, PropTypes } from 'react';
import Toggle from 'material-ui/Toggle';


class ToggleGroup extends Component{

  render(){
    const styles = {
      root:{
        marginLeft:"20px",
        marginBottom: "20px"
      },
      toggle:{
        display:"inline-block",
        width:"100px"

      },
      thumbSwitched:{
        backgroundColor:"red"
      },
      trackSwitched: {
        opacity: "0.3",
        backgroundColor: "red",
      }
    }
    return (
      <div style={styles.root}>
      <Toggle
        label="High"
        defaultToggled={true}
        labelPosition="right"
        style={styles.toggle}
        onToggle={this.props.handleGroup[0]}
      />
      <Toggle
        label="Low"
        labelPosition="right"
        style={styles.toggle}
        onToggle={this.props.handleGroup[1]}
      />
      <Toggle
        label="Open"
        labelPosition="right"
        style={styles.toggle}
        onToggle={this.props.handleGroup[2]}
      />
      <Toggle
        label="Close"
        labelPosition="right"
        style={styles.toggle}
        thumbSwitchedStyle={styles.thumbSwitched}
        trackSwitchedStyle={styles.trackSwitched}
        onToggle={this.props.handleGroup[3]}
      />
      </div>
    )
  }
}

export default ToggleGroup;
