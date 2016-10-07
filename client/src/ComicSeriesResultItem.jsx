import React, { Component } from 'react';

class ComicSeriesResultItem extends Component {
  render() {
    return (
      <div>
        <span className="title">{this.props.series.value.title}</span>
        <span onClick={() => {this.props.deleteComic(this.props.series.id)}}>X</span>
      </div>
    )
  }
}

export default ComicSeriesResultItem;