import React from 'react';
import ComicSeriesTable from './ComicSeriesTable';
import ComicResultsSearchBar from './ComicSeriesResultsSearchBar';

module.exports = React.createClass( {
  getInitialState: function() {
    return {
      filterText: '',
      inPrint: false
    };
  },

  handleUserInput: function(filterText) {
    this.setState({
      filterText: filterText,
    });
  },

  render: function() {
    return(
        <div id='seriesSearch'>
          <ComicResultsSearchBar
            filterText={this.state.filterText}
            onUserInput={this.handleUserInput} 
          />
          <ComicSeriesTable
            comics={this.props.comics}
            deleteComic={this.props.deleteComic}
            filterText={this.state.filterText}
          />
        </div>
    );
  }
});