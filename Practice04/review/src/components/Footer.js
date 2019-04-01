import React, { Component } from 'react';
import Left from './Left';

class Footer extends Component {
  render() {
    return (
      <footer className="todo-app__footer" id="todo-footer">
        <Left todolist={this.props.todolist}/>
        <ul className="todo-app__view-buttons">
          <button onClick={() => this.props.onFilterClick('1')}>all</button>
          <button onClick={() => this.props.onFilterClick('2')}>Active</button>
          <button onClick={() => this.props.onFilterClick('3')}>Completed</button>
        </ul>
        <div className="todo-app__clean">
          <button id="clean" onClick={this.props.onClearClick}>Clear completed</button>
        </div>
      </footer>
    );
  }
}

export default Footer;
