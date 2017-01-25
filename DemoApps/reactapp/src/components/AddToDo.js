import React, { Component } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap'

export default class AddToDo extends Component {

  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  handleChange(e) {
    this.setState({ value: e.target.value.trim() });
  }

  render() {
    let { onAddToDo } = this.props;

    let performClick = () => {
      if (this.state.value) {
        onAddToDo(this.state.value);
        this.setState({ value: '' });
      }
    };

    return (
      <div>
        <Form inline>
          <FormControl value={ this.state.value } onChange={ this.handleChange.bind(this) } />
          <Button onClick={ performClick }>
            Add Todo
          </Button>
        </Form>
      </div>
    )
  }
}