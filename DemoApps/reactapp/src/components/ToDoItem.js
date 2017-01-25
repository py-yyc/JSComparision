import React, { Component, PropTypes } from 'react'
import { ListGroupItem } from 'react-bootstrap';

export default class ToDoItem extends Component {

  static propTypes = {
    onClick: PropTypes.func.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  };

  render() {
    let { onClick, completed, text } = this.props;
    let textStyle = { textDecoration: completed ? 'line-through' : 'none' };
    let bsStyle = completed ? 'success' : undefined;
    return (
      <ListGroupItem onClick={ onClick } bsStyle={ bsStyle }>
        <span style={ textStyle }>{text}</span>
      </ListGroupItem>
    )
  }
}