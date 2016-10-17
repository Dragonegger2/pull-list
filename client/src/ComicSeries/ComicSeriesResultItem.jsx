import React, { Component } from 'react';

class ComicSeriesResultItem extends Component {
  render() {
    var thumbnail; 
    if(this.props.series.value.thumbnail != null) {
      thumbnail = <div className='thumbnail'><img src={this.props.series.value.thumbnail} alt="Series" /></div>;
    }
    var publishing;
    if(this.props.series.value.title.indexOf('(') != -1) {
      var title =  this.props.series.value.title.substring(0, this.props.series.value.title.indexOf('('));
      publishing = this.props.series.value.title.substring(this.props.series.value.title.indexOf('('), this.props.series.value.title.indexOf(')')+1);

    }
    
    return (
      <div className='entry'>
        {thumbnail}
        <div className='data'>
          <span className="title">
            <h2>{title}</h2>
          </span>
          <p>{publishing}</p>
          <p className='description'>{this.props.series.value.desc}</p>
        </div>
        <div>
            <a className='deleteComic' onClick={() => {this.props.deleteComic(this.props.series.id)}} href='#' title='Delete this comic from the database.'>X</a>
        </div>
      </div>
    )
  }
}

export default ComicSeriesResultItem;