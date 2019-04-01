import React, { Component } from 'react';
import '../App.css';
import '../styles.css';
import Header from '../components/Header';
import Section from '../components/Section';
import Footer from '../components/Footer';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      currentFilter:"1",
      todolist:{"0":{tid: "0", value:"abc",isComplete:false,isDelete:false},"1":{tid: "1", value:"def",isComplete:false,isDelete:false}}
    }
  }
  handleInput = (e) => {
    if (e.keyCode === 13 && e.target.value !== "") {
      const content = e.target.value;
      this.setState((prevState) => {
        const tid = Object.keys(prevState.todolist).length.toString();
        return {
          ...prevState,
          todolist:{
            ...prevState.todolist,
            [tid]:{tid, value:content,isComplete:false,isDelete:false}
          }
        };
      });
      e.target.value = "";
      e.target.blur();
    }
  };
  onItemCheck = (tid) => {
    this.setState((prevState) => ({
      ...prevState,
      todolist: {
        ...prevState.todolist,
        [tid]: {
          ...prevState.todolist[tid],
          isComplete: !prevState.todolist[tid].isComplete,
        }
      }
    }));
  }
  onItemDelete = (tid) => {
    this.setState((prevState) => ({
      ...prevState,
      todolist: {
        ...prevState.todolist,
        [tid]: {
          ...prevState.todolist[tid],
          isDelete: true,
        }
      }
    }));
  }
  onFilterClick = (filterID) => {
    this.setState((prevState) => ({
      ...prevState,
      currentFilter:filterID,
    }));
  }
  onClearClick = () => {
    this.setState((prevState) => {
      const newState = prevState;
      Object.keys(newState.todolist).forEach(tid => {
        newState.todolist[tid].isDelete = newState.todolist[tid].isComplete;
      });
      return newState
    });
  }
  render() {
    return (
      <div id="todo-container" className="todo-app__container">
        <Header />
        <Section input={this.handleInput} todolist={this.state.todolist} onItemCheck={this.onItemCheck}
        onItemDelete={this.onItemDelete} currentFilter={this.state.currentFilter}/>
        <Footer AppState={this.state.AppState} todolist={this.state.todolist} onFilterClick={this.onFilterClick} onClearClick={this.onClearClick}/>
      </div>
    );
  }
}

export default App;
