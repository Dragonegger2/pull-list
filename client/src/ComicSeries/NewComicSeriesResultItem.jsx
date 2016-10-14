import React, { Component } from 'react';

class NewComicSeriesResultItem extends Component {
  render() {
    console.log(this.props);
    var thumbnail; 
    if(this.props.series.value.thumbnail != null) {
      thumbnail = <div className='thumbnail'><img src={this.props.series.value.thumbnail} alt="Series" /></div>;
    }
    return (
      <div className='entry'>
        {thumbnail}
        <div className='data'>
          <span className="title">
            <h2>{this.props.series.value.title}</h2>
            <a onClick={() => {this.props.deleteComic(this.props.series.id)}} href='#'>X</a>
          </span>
        </div>
        
      </div>
    )
  }
}

export default NewComicSeriesResultItem;