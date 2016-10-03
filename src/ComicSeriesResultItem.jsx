import React from 'react';

module.exports = React.createClass( {

  render: function() {
    return (
      <div>
        <span>{this.props.series.comicName}</span>
      </div>
    );
  }
});

