import React, { Component } from 'react';

class NewComicSeries extends Component {
  handleChange() {
    this.props.onUserInput(
      this.refs.searchName.value
    );
  }

  render() {
    return (   
		<div className='newSeries'>
      <div>
        <h2>Add a new series:</h2>
      </div>
			<div className='value name'>
				<span>Series Name:</span>
        <input 
          type="text"
          value={this.props.searchName}
          onChange={this.handleChange}
        />
			</div>
			<div className='value authors'>
				<span>Authors:</span>
        <input type="text" />
        <span class='addAuthor'>
            +
        </span>
			</div>
			<div className='value'>
				<span>Publisher:</span>
				<select>
					<option value="Image Comics">Image Comics</option>
					<option value="Marvel Comics">Marvel Comics</option>
				</select>
			</div>
			<div className='value'>
				 <input 

          type="button"
          value="CREATE"
          onClick={() => this.props.addComic(this.props.searchName)}
          />
			</div>
		</div>
    );
  }
}

export default NewComicSeries;