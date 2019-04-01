import React, { Component } from 'react';

class Left extends Component {
  render() {
    return (
      <div className="todo-app__total">
        <p id="left">{
          Object
            .keys(this.props.todolist)
            .map(key => this.props.todolist[key])
            .filter(item => !item.isComplete)
            .length
        } left</p>
       </div>
    );
  }
}

export default Left;
