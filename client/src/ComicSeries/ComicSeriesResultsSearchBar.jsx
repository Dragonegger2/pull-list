import React from 'react';

module.exports = React.createClass({
  handleChange: function() {
    this.props.onUserInput(
      this.refs.filterTextInput.value,
      this.refs.inPrintInput.checked
    );
  },

  render: function() {
    return (
      <form>
        <input
          type="text"
            placeholder="Search..."
            value={this.props.filterText}
            ref="filterTextInput"
            onChange={this.handleChange}
          />
        <p>
          <input
            type="checkbox"
            checked={this.props.inPrint}
            ref="inPrintInput"
            onChange={this.handleChange}
          />
          {' '}
          Only show products in stock
        </p>
      </form>
    );
  }
});