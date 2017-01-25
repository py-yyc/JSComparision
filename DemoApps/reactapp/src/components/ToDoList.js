import React, { Component, PropTypes } from 'react'
import { ListGroup } from 'react-bootstrap';
import ToDoItem from './ToDoItem'

export default class TodoList extends Component {

  static propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired).isRequired,
    onTodoClick: PropTypes.func.isRequired
  };

  render() {
    let { todos, onTodoClick } = this.props;
    if (todos.length == 0) {
      return <h5>Nothing to see here</h5>
    } else {
      return (
        <ListGroup>
          <h4>Todos:</h4>
          {todos.map(todo =>
            <ToDoItem
              key={todo.id}
              {...todo}
              onClick={() => onTodoClick(todo.id)}
            />
          )}
        </ListGroup>
      )
    }
  }
}