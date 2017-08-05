import React from 'react';
import ReactDOM from 'react-dom';
var {MenuBar, MenuItem, Menu, Separator} = require('react-menu-bar');

var MenuStuff = React.createClass({
  render: function() {
    <MenuBar onSelect={this.onSelect}>
      <MenuItem label='Golf Courses' command='courses' />
      <MenuItem label='Active Users' command='golfers' />
      <MenuItem label='Upcoming Play Times' commend='playtimes' />
    </MenuBar>
  },

  onSelect: function(command) {
    //update state to render that page
    console.log('*******Selected: ', command);
  }
});

export default MenuStuff;
