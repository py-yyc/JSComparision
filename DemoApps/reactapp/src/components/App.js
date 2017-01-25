import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.handleNavClick = this.handleNavClick.bind(this);
  }

  handleNavClick(evt) {
      // If the drop down nav menu is showing (ex: on small device) and the user clicks a link, we should
      // close the drop down so that is no longer visible when the content for the new route is shown...
      if (ReactDOM.findDOMNode(this.navbarCollapse).classList.contains('in')) {
        setTimeout(() => {
          ReactDOM.findDOMNode(this.navbarToggle).click();
        }, 100);
      }
  }

  render() {
    return (
      <div>
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">React App</Link>
            </Navbar.Brand>
            <Navbar.Toggle ref={(ref) => this.navbarToggle = ref} />
          </Navbar.Header>
          <Navbar.Collapse ref={(ref) => this.navbarCollapse = ref}>
            <Nav onClick={this.handleNavClick}>
              <IndexLinkContainer to="/"><NavItem>Redux Todo</NavItem></IndexLinkContainer>
              <LinkContainer to="/request"><NavItem>React API Request</NavItem></LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="container-fluid strip-padding">
          { this.props.children }
        </div>
      </div>
    )
  }
}