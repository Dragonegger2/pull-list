import React from 'react';
import ComicSeriesTable from './ComicSeriesTable';
import ComicResultsSearchBar from './ComicResultsSearchBar';

module.exports = React.createClass( {
  getInitialState: function() {
    return {
      filterText: '',
      inPrint: false
    };
  },

  handleUserInput: function(filterText, inPrint) {
    this.setState({
      filterText: filterText,
      inPrint: inPrint
    });
  },

  render: function() {
    return(
        <div id='seriesSearch'>
          <ComicResultsSearchBar
            filterText={this.state.filterText}
            inPrint={this.state.inPrint}
            onUserInput={this.handleUserInput} 
          />
          <ComicSeriesTable
            comics={this.props.comics}
            filterText={this.state.filterText}
            inPrint={this.state.inPrint}
          />
        </div>
    );
  }
});