import React, { Component } from 'react'

export class HeaderComponent extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/recents">Zanimoo</a>
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" disabled />
          <button className="btn btn-primary mx-1" >Login</button>
          <button className="btn btn-outline-primary mx-1" >Signup</button>
        </nav>
      </div>
    )
  }
}

export default HeaderComponent
