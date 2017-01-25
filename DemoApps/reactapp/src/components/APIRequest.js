import React, { Component } from 'react'
import { Button, Col, Panel, Well } from 'react-bootstrap';

import config from '../config';

export default class APIRequest extends Component {

  constructor(props) {
    super(props);
    this.state = { content: '' };
  }

  clearRequest() {
    // Clear request state
    this.setState({ content: ''});
  }

  makeRequest() {
    // Indicate that the request is in flight
    this.setState({ content: 'Requesting...'});

    // Bind setState callback for use within the fetch Promise
    let setState = this.setState.bind(this);

    // Submit request to the API Host and store response or error when it returns
    let promise = fetch(config['apiHost']);
    promise.then(function(response) {
      setState({ content: 'Parsing...' });
      return response.text()
    }).then(function(text) {
      setState({ content: text });
    }).catch(function(ex) {
      setState({ content: `Error: ${ex}` });
    })
  }

  render() {
    let content;
    if (this.state.content) {
      content = (
        <div>
          <hr/>
          <h5>Response:</h5>
          <Well>
            { this.state.content }
          </Well>
        </div>
      );
    } else {
      content = <div></div>;
    }

    return (
      <Col xs={12} mdOffset={2} md={8}>
        <Panel>
          <h1>API Request</h1>
          <div>
            <Button onClick={ this.makeRequest.bind(this) }>
              Make Request
            </Button>
            {"  "}
            <Button onClick={ this.clearRequest.bind(this) }>
              Clear Request
            </Button>
            { content }
          </div>
        </Panel>
      </Col>
    )
  }
}