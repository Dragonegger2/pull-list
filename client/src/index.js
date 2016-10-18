import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ComicSeries from './ComicSeries/ComicSeries';

var PullList = React.createClass({
  getInitialState: function () {
    return {
      comics: []
    }
  },

  componentDidMount: function () {
    fetch(`http://localhost:3001/api/comics`)
      .then((response) => response.json())
      .then((jsonResponse) => {
        this.setState({
          comics: jsonResponse
        });
      });
  },

  deleteComic: function (comicDBID) {
    console.log(`Deleting ${comicDBID}`)

    fetch(`/api/comics/${comicDBID}`, {
      method: 'DELETE'
    }).then((body) => {
      console.log(body);
      var comics = this.state.comics;
      console.log(comics);
      if (body.ok === true) {
        comics.every((comic, index, arr) => {
          if (comic.id === comicDBID) {
            comics.splice(index, 1);
            return false;
          }
          return true;
        });

        console.log(comics);
        this.setState({comics: comics});
      }
    })
  },

  addComic: function(name) {
    console.log(`Adding a comic with the name of: ${name}`);
    fetch(`/api/comics/${name}`, {
      method: 'PUT'
    }).then((body) => {
      console.log(body);
    });
  },

  render: function () {
    return (
      <div id='app'>
        <ComicSeries
          deleteComic={this.deleteComic}
          addComic={this.addComic}
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
