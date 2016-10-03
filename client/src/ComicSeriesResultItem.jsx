import React, { Component } from 'react';

class ComicSeriesResultItem extends Component{

  render() {
    return (
      <div>
        <span>{this.props.series.comicName}</span>
        <span>{this.props.series.inPrint}</span>
      </div>
    )
  }
}

export default ComicSeriesResultItem;

