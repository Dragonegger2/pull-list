import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
var ComicSeries = require('./ComicSeries.jsx');

var COMICS = [
  {comicName: "Amazing Spider-man (2014-2015)", inPrint: false},
  {comicName: "Amazing Spider-man (2015-2016)", inPrint: true}
  
]

var PullList = React.createClass({
  getInitialState: function() {
    return {
      comics: COMICS
    }
  },

  render: function() {
    return (
      <div id='app'>Hello World!
      <ComicSeries comics={this.props.comics}/>
      </div>
      );
  }
});

ReactDOM.render(
  <PullList comics={COMICS} />,
  document.getElementById('root')
);
