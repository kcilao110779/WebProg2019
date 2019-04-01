import React, { Component } from 'react';
import Item from './Item';

class Items extends Component {
  shouldItemShow = (item) => {
    const { currentFilter} = this.props;
    console.log(item, currentFilter);
    if (item.isDelete) return false;
    if(currentFilter==="1") return true;
    if(currentFilter==="2") return !item.isComplete;
    return item.isComplete;
  }
  render() {
    const { todolist, onItemCheck, onItemDelete} = this.props;
    return (
      <ul className="todo-app__list" id="list">
      {
        Object
          .keys(todolist)
          .map(key => todolist[key])
          .filter(this.shouldItemShow)
          .map(item =>
          <Item key={item.tid} data={item} onCheck={onItemCheck} onDelete={onItemDelete}/>
          )
      }
      </ul>
    );
  }
}

export default Items;
