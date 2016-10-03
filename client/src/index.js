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
    fetch("/api/comics")
      .then((response) => response.json())
      .then((jsonResponse) => {
        console.log(jsonResponse);
        this.setState({
          comics: jsonResponse
        });
      });
  },

  render: function() {
    console.log(this.state.comics);
    return (
      <div id='app'>Hello World!
      <ComicSeries comics={this.state.comics}/>
      </div>
      );
  }
});

ReactDOM.render(
  <PullList/>,
  document.getElementById('root')
);
