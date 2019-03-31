import React,{Component} from 'react';
import Input from './components/Input';

import TodoItems from './components/TodoItems';

class TodoList extends Component{
    constructor(props){
        super(props);

        this.state = {
            items:[],
            count:0
        };

        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }
    
    addItem = e => {
        if (e.key === "Enter" && e.target.value!=="") { //e是event發生
            var newItem = {
                text: e.target.value,
                key:Date.now(),
            };
            this.setState((prevState) => {
               return{
                   items:prevState.items.concat(newItem),
                   count: this.state.count + 1    
               };
            })
        //  this.setState(() => ({ count: this.state.count + 1 }));
            e.target.value = ""; //enter後回歸初始
        //  e.target.blur(); //enter後會跳出輸入框

            console.log(this.state.items);
            console.log(this.state.count);
            
        }
    };
    deleteItem(key){
        var filteredItems = this.state.items.filter(function (items){
            return (items.key !== key)
        });

        this.setState({
            items:filteredItems,
            count: this.state.count - 1
        });
    }
    
    render(){
        return(
            <div className="todo-todo-app__root">
                <header className="todo-app__header">
                    <h1 className="todo-app__title">
                        todos
                    </h1>
                </header>
                <section className="todo-app__main">
                <Input onKeyPress={this.addItem} />
              
                <footer className="todo-app__footer"> 
                    <div className="todo-app__total" id="todo-total">
                        {this.state.count} left
                    </div>
                    <ul className="todo-app__view-buttons">
                        <button>ALL</button>
                        <button>Active</button>
                        <button>Completed</button>
                    </ul>
                    <div className="todo-app__clean">
                        <button>
                            Clear completed
                        </button>
                    </div>
                </footer>
                <TodoItems entries={this.state.items}
                            delete={this.deleteItem}/> 
                {/* <ul className="todo-app__list" id="todo-list">
                    <li className="todo-app__item" >
            
                        <div className="todo-app__checkbox">
                            <input id="0" type="checkbox" value="0"></input>
                            <label htmlFor="0"></label>
                        </div>
                        <h1 className="todo-app__item-detail">
                            default
                        </h1>
                        <img alt="" src={Img} className="todo-app__item-x"></img>
                    </li>   
                </ul> */}
                </section>
            </div>
        );
    }
}
export default TodoList;