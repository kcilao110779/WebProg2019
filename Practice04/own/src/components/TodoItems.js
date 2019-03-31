import React, {Component} from "react";
import Img from '../img/x.png';

class TodoItems extends Component{
    constructor(props){
        super(props);

        this.createTasks = this.createTasks.bind(this);
    }

    delete(key){
        this.props.delete(key);
    }
    createTasks(item){
        return (
        <li key={item.key} className="todo-app__item" >
            <div className="todo-app__checkbox">
                <input id="0" type="checkbox" value="0"></input>
                <label htmlFor="0"></label>
            </div>
            <h1 className="todo-app__item-detail">
                {item.text}
            </h1>
            <img alt="" src={Img} className="todo-app__item-x" onClick={() => this.delete(item.key)}></img>
        </li>
        );
    }

    render(){
        var todoEntries = this.props.entries;
        var listItems = todoEntries.map(this.createTasks);

        return(
            <ul className="todo-app__list" id="todo-list">
                {listItems}
            </ul>
        )
    }
}
export default TodoItems;