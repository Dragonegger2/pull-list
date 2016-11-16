import React, { Component } from 'react';

class AuthorComponent extends Component {

  handleUserInput() {
    // this.setState({
    //   filterText: filterText,
    // });
  }

  render() {
    return(
			<div className='value authors'>
				<span>Authors:</span>
        <input type="text" />
        <input 
          type='button' 
          className='addAuthor'
          value='X' />
			</div>
    );
  }
}

export default AuthorComponent