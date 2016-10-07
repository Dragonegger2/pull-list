import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ComicSeries from './ComicSeries';

var PullList = React.createClass({
  getInitialState: function() {
    return {
      comics: []
    }
  },

  componentDidMount: function() {
    fetch(`http://localhost:3001/api/comics`)
      .then((response) => response.json())
      .then((jsonResponse) => {
        this.setState({
          comics: jsonResponse
        });
      });
  },
  deleteComic: function(id) {
    console.log(`User trying to remove comic by id: ${id}`);
     // fetch(`/api/comics/${id}`, {
    //   method: 'DELETE'
    // }, (err, body) => {
    // });

  },
  render: function() {
    return (
      <div id='app'>
        <ComicSeries 
          deleteComic={this.deleteComic} 
          comics={this.state.comics}
        />
      </div>
      );
  }
});

ReactDOM.render(
  <PullList/>,
  document.getElementById('root')
);
