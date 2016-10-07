import React, { Component } from 'react';

class ComicSeriesResultItem extends Component {

  removeComic() {
    console.log("User trying to remove comic.");
  }

  render() { 
    return (
      <div>
        <span className="title">{this.props.series.title}</span>
        <span onClick={this.removeComic}>CLICK HERE TO REMOVE THIS</span>
      </div>
    )
  }
}

export default ComicSeriesResultItem;

