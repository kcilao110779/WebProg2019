import React, { Component } from 'react';
import XImage from './img/x.png';


class Item
 extends Component {
  render() {
    const { data, onCheck, onDelete} = this.props;
    return (
      <li className="todo-app__item">
        <div className="todo-app__checkbox">
          <input type="checkbox" id={data.tid} />
          <label htmlFor={data.tid} onClick={() => onCheck(data.tid)}></label>
        </div>
        <h1 className={`todo-app__item-detail ${data.isComplete ? 'todo-app_item-finished' : ''}`}>{data.value}</h1>
        <img src={XImage} className="todo-app__item-x" alt="" onClick={() => onDelete(data.tid)}/>
      </li>
    );
  }
}

export default Item
;
