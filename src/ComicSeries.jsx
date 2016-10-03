import React from 'react';
import ComicSeriesTable from './ComicSeriesTable';
import ComicResultsSearchBar from './ComicResultsSearchBar';

module.exports = React.createClass( {
  getInitialState: function() {
    return {
      filterText: '',
      inStockOnly: false
    };
  },

  handleUserInput: function(filterText, inStockOnly) {
    this.setState({
      filterText: filterText,
      inStockOnly: inStockOnly
    });
  },

  render: function() {
    return(
        <div id='seriesSearch'>
          <ComicResultsSearchBar
            filterText={this.state.filterText}
            inStockOnly={this.state.inStockOnly}
            onUserInput={this.handleUserInput} 
          />
          <ComicSeriesTable
            comics={this.props.comics}
            filterText={this.state.filterText}
            inStockOnly={this.state.inStockOnly}
          />
        </div>
    );
  }
});