import React from 'react'
import { FormControl } from 'react-bootstrap'
import { connect } from 'react-redux'

import { default as AddToDoComponent } from '../components/AddToDo';
import { addTodo } from '../actions'

// Wrap the add click with a dispatch of the redux `addTodo` action
function mapDispatchToProps(dispatch) {
  return {
    onAddToDo: text => { dispatch(addTodo(text)) }
  }
}

export default connect(
  undefined,
  mapDispatchToProps
)(AddToDoComponent);