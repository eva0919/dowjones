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
      thumbSwitched:[{
        backgroundColor:this.props.colors[0]
      },{
        backgroundColor:this.props.colors[1]
      },{
        backgroundColor:this.props.colors[2]
      },{
        backgroundColor:this.props.colors[3]
      }
      ],
      trackSwitched:[{
        opacity: "0.3",
        backgroundColor:this.props.colors[0]
      },{
        opacity: "0.3",
        backgroundColor:this.props.colors[1]
      },{
        opacity: "0.3",
        backgroundColor:this.props.colors[2]
      },{
        opacity: "0.3",
        backgroundColor:this.props.colors[3]
      }
      ]
    }
    return (
      <div style={styles.root}>
      <Toggle
        label="High"
        defaultToggled={true}
        labelPosition="right"
        style={styles.toggle}
        thumbSwitchedStyle={styles.thumbSwitched[0]}
        trackSwitchedStyle={styles.trackSwitched[0]}
        onToggle={this.props.handleGroup[0]}
      />
      <Toggle
        label="Low"
        labelPosition="right"
        style={styles.toggle}
        thumbSwitchedStyle={styles.thumbSwitched[1]}
        trackSwitchedStyle={styles.trackSwitched[1]}
        onToggle={this.props.handleGroup[1]}
      />
      <Toggle
        label="Open"
        labelPosition="right"
        style={styles.toggle}
        thumbSwitchedStyle={styles.thumbSwitched[2]}
        trackSwitchedStyle={styles.trackSwitched[2]}
        onToggle={this.props.handleGroup[2]}
      />
      <Toggle
        label="Close"
        labelPosition="right"
        style={styles.toggle}
        thumbSwitchedStyle={styles.thumbSwitched[3]}
        trackSwitchedStyle={styles.trackSwitched[3]}
        onToggle={this.props.handleGroup[3]}
      />
      </div>
    )
  }
}

export default ToggleGroup;
