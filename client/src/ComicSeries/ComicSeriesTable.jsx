import React, { Component } from 'react';
import ComicSeriesResultItem from './ComicSeriesResultItem';
import NewComicSeries from './NewComicSeries';

class ComicSeriesTable extends Component {
  render() {
    var rows = [];
    if(this.props.filterText !== "") {
        rows.push(<NewComicSeries 
          searchName={this.props.filterText}
          addComic={this.props.addComic} 
        />);
    }
    
    this.props.comics.forEach(function(comic) {
      if(this.props.filterText === "" || this.props.filterText === null) {
        return;
      }
      if (comic.key.toLowerCase().indexOf(this.props.filterText.toLowerCase()) !== -1) {
        rows.push(<ComicSeriesResultItem 
          id={comic.id}
          key={comic.id}
          title={comic.key}
          deleteComic={this.props.deleteComic}
          thumbnail={comic.value.thumbnail}
          />
        );
      }
    }.bind(this));

    return(
      <div className='results'>
        {rows}
      </div>
    );
  }
}

export default ComicSeriesTable;