import React, { Component } from 'react'
import FilterLink from '../containers/FilterLink'

export default class Footer extends Component {

  render() {
    return (
      <div>
        <h5>Show:</h5>
        <p>
          {" "}
          <FilterLink filter="SHOW_ALL">
            All
          </FilterLink>
          {", "}
          <FilterLink filter="SHOW_ACTIVE">
            Active
          </FilterLink>
          {", "}
          <FilterLink filter="SHOW_COMPLETED">
            Completed
          </FilterLink>
        </p>
      </div>
    )
  }
}