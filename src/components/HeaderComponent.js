import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class HeaderComponent extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/recents">Zanimoo</Link>
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" disabled />
          <button className="btn btn-primary mx-1" >Login</button>
          <button className="btn btn-outline-primary mx-1" >Signup</button>
        </nav>
      </div>
    )
  }
}

export default HeaderComponent
