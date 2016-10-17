import React, { Component } from 'react';
import ComicSeriesResultItem from './ComicSeriesResultItem';
import NewComicSeries from './NewComicSeries';

class ComicSeriesTable extends Component {
  render() {
    var rows = [];
    if(this.props.filterText !== "") {
        rows.push(<NewComicSeries searchName={this.props.filterText} />);
    }
    
    this.props.comics.forEach(function(comic) {
      if(this.props.filterText === "" || this.props.filterText === null) {
        return;
      }
      if (comic.value.title.toLowerCase().indexOf(this.props.filterText.toLowerCase()) !== -1) {
        rows.push(<ComicSeriesResultItem 
          series={comic} 
          key={comic.id} 
          deleteComic={this.props.deleteComic}/>
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