import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from './SearchComponent'

export class HeaderComponent extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">Zanimoo</Link>
          <SearchBar />
          <button className="btn btn-primary mx-1" >Login</button>
          <button className="btn btn-outline-primary mx-1" >Signup</button>
        </nav>
      </div>
    )
  }
}

export default HeaderComponent
