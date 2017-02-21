import React, { Component, PropTypes } from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';


class MenuGroup extends Component{

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
    const nodes = this.props.groupList.map( stockName =>{
      return <MenuItem value={stockName.name} primaryText={stockName.name} />
    })
    return (
      <div style={styles.root}>
        <DropDownMenu value={this.props.value} onChange={this.props.handleChange}>
          {nodes}
        </DropDownMenu>
      </div>
    )
  }
}

export default MenuGroup;
