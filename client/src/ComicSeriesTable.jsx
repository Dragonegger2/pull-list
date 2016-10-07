import React, { Component } from 'react';
import ComicSeriesResultItem from './ComicSeriesResultItem';

class ComicSeriesTable extends Component {
  render() {
    var rows = [];
    this.props.comics.forEach(function(comic) {
      if(this.props.filterText === "" || this.props.filterText === null) {
        return;
      }
      if (comic.value.title.toLowerCase().indexOf(this.props.filterText.toLowerCase()) !== -1) {
        rows.push(<ComicSeriesResultItem series={comic.value} key={comic.id} />);
      }
    }.bind(this));

    return( 
      <div>{rows}</div>
    );
  }
}

export default ComicSeriesTable;