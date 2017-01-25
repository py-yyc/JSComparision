import React, { Component, PropTypes } from 'react'

export default class Link extends Component {

  static propTypes = {
    active: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired
  };

  render() {
    let { active, children, onClick } = this.props;
    let onClickWrapper = e => {
      e.preventDefault(); onClick()
    };

    if (active) {
      return <span>{children}</span>
    } else {
      return (
        <a href="#" onClick={ onClickWrapper }>
          {children}
        </a>
      )
    }
  }
}