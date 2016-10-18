import React, { Component } from 'react';

class NewComicSeries extends Component {
  handleChange() {
    this.props.onUserInput(
      this.refs.searchName.value
    );
  }

  handleSubmit() {
      console.log("Pressed a button")
  }
  render() {
    return (   
      <div className='newSeries'>
      <h2>
        Add a new series:
      </h2>
        <input 
          type="text" 
          value={this.props.searchName}
          onChange={this.handleChange} 
          />
        <input 
          type="button"
          value="Add"
          onClick={() => this.props.addComic(this.props.searchName)}
          />
      </div>
    );
  }
}

export default NewComicSeries;