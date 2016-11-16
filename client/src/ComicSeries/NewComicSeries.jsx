import React, { Component } from 'react';
import AuthorComponent from './AuthorComponent';

var ENTER_KEY = 13;

class NewComicSeries extends Component {
  constructor(props) {
    super(props);
    console.log("Creating new comic series comp.");
    this.state = { 
      authors: []
    };
  }

  handleChange() {
    this.props.onUserInput(
      this.refs.searchName.value
    );
  }

  handleNewAuthorKeyDown(event) {
    if (event.keyCode !== ENTER_KEY) {
      return;
    }

    event.preventDefault();

    var val = this.state.newAuthor.trim();

    var auth = this.state.authors;
    auth.push(val);
    this.setState({
      authors: auth
    });
  }

  render() {
    var _authors = [];
    
    this.state.authors.forEach((author) => {
      _authors.push(<AuthorComponent />);
    });

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
        <span>Author:</span>
        <input
          type='textbox'
          placeholder='Press enter after entering an author.'
          value={this.state.newAuthor}
          onKeyDown={this.handleNewAuthorKeyDown}
          onChange={this.handleChange}
          />
      </div>
      {_authors}
			<div className='value'>
				<span>Publisher:</span>
				<select>
					<option value="Image Comics">Image Comics</option>
					<option value="Marvel Comics">Marvel Comics</option>
					<option value="DC Comics">DC Comics</option>
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