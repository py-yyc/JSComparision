import React, { Component } from 'react'
import { Col, Panel } from 'react-bootstrap';

import Footer from './Footer'
import AddToDo from '../containers/AddToDo'
import VisibleToDoList from '../containers/VisibleToDoList'

export default class ToDo extends Component {

  render() {
    let footer = <Footer/>;
    return(
      <Col xs={12} mdOffset={2} md={8}>
        <Panel footer={ footer }>
          <AddToDo />
          <VisibleToDoList/>
        </Panel>
      </Col>
    )
  }
}