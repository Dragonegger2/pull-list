import React, { Component } from 'react';

class ComicSeriesResultItem extends Component {
  render() {
    var thumbnail; 
    if(this.props.thumbnail != null) {
      thumbnail = <div className='thumbnail'><img src={this.props.thumbnail} alt="Series" /></div>;
    }
    
    var publishing;
    var title = this.props.title;
    if(this.props.title.indexOf('(') !== -1) {
      title =  this.props.title.substring(0, this.props.title.indexOf('('));
      publishing = this.props.title.substring(this.props.title.indexOf('('), this.props.title.indexOf(')')+1);
    }
    
    
    return (
      <div className='entry'>
        {thumbnail}
        <div className='data'>
          <span className="title">
            <h2>{title}</h2>
          </span> 
            <p>{publishing}</p>
        </div>
        <div>
            <a className='deleteComic' onClick={() => {this.props.deleteComic(this.props.id)}} href='#' title='Delete this comic from the database.'>X</a>
        </div>
      </div>
    )
  }
}

export default ComicSeriesResultItem;