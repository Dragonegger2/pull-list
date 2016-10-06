import React, { Component } from 'react';

class ComicSeriesResultItem extends Component{

  render() {
    return (
      <div>
        <span>{this.props.series.title}</span>
      </div>
    )
  }
}

export default ComicSeriesResultItem;

