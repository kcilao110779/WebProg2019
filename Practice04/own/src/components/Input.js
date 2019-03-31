import React from 'react';
import '../index.css';
export default ({onKeyPress}) => {
  return <input type="text" 
                id="todo-input"
                className="todo-app__input"
                placeholder="What to be done"
                onKeyPress={onKeyPress}
         />;
}