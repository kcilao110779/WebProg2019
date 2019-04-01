import React, { Component } from 'react';

class Input extends Component {
  render() {
    return (
      <input className="todo-app__input" placeholder="What needs to be done?" id="todo-input" onClick={this.props.input} />
    );
  }
}

export default Input;
