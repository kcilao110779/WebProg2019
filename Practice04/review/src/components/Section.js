import React, { Component } from 'react';
// import Input from './Input';
import Items from './Items';

class Section extends Component {
  render() {
    const { todolist, onItemCheck, input, onItemDelete, currentFilter} = this.props;
    return (
      <section className="todo-app__main">
        <input className="todo-app__input" placeholder="What needs to be done?" id="todo-input" onKeyUp={input}/>
        <Items todolist={todolist} onItemCheck={onItemCheck} onItemDelete={onItemDelete} currentFilter={currentFilter}/>
      </section>
    );
  }
}

export default Section;
