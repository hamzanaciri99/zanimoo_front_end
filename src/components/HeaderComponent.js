import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from './SearchComponent';
import '../stylesheets/Header.css';

export class HeaderComponent extends Component {
  render() {
    return (
      <header id="header" className="container-fluid">
        <nav className="row navbar navbar-expand-lg navbar-light">
          <Link className="navbar-brand col-1" to="/">Zanimoo</Link>
          <SearchBar />
          <button className="col-1 button ml-md-4 mr-2" >Login</button>
          <button className="col-1 button-outline mr-md-2" >Signup</button>
        </nav>
      </header>
    )
  }
}

export default HeaderComponent
