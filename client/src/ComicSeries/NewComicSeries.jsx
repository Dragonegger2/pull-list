import React, { Component } from 'react';

class NewComicSeries extends Component {
  render() {
    return (   
      <div>Add a new comic series with the title: {this.props.searchName}</div>
    );
  }
}

export default NewComicSeries;