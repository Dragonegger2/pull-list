import React from 'react';
import ComicSeriesResultItem from './ComicSeriesResultItem';

module.exports = React.createClass({
  render: function() {
    var rows = [];
    this.props.comics.forEach(function(comic) {
      if (comic.comicName.toLowerCase().indexOf(this.props.filterText.toLowerCase()) === -1 || (!comic.stocked && this.props.inStockOnly)) {
        return;
      }
      rows.push(<ComicSeriesResultItem series={comic} key={comic.comicName} />);
    }.bind(this));

    return( 
      <div>{rows}</div>
    );
  }
});