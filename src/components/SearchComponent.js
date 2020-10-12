import React, { Component } from 'react';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import { fetchSearchResults, searchCleared } from '../redux/actions/search';
import { Link } from 'react-router-dom';

/**
 * @enum {string}
 */
const DISPLAY = {
  NONE: 'none',
  BLOCK: 'block',
  INLINE: 'inline',
}

const LIST_MAX = 5;

export class SearchBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      query: '',
      dropdownDisplay: DISPLAY.NONE,
      localPage: 0,
    };

    this._onChange = this._onChange.bind(this);
    this.onChangeDebounced = debounce(this.onChangeDebounced, 500).bind(this);
    this._onFocus = this._onFocus.bind(this);
    this._onBlur = debounce(this._onBlur, 500).bind(this);

    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);

    this.clickedElement = null;
    document.addEventListener('mousedown', (event) => {
      this._onBlur(event);
    });
  }

  _onChange(event) {
    this.setState({
      query: event.target.value,
    });
    this.onChangeDebounced();
  }

  _onFocus() {
    if(this.state.dropdownDisplay === DISPLAY.NONE)
      this.setState({
        dropdownDisplay: DISPLAY.BLOCK,
      });
  }

  _onBlur(event) {
    if(event.target !== document.getElementById('previous') &&
        event.target !== document.getElementById('next') && 
          event.target !== document.getElementById('input')) {
      if(this.state.dropdownDisplay !== DISPLAY.NONE)
        this.setState({
          dropdownDisplay: DISPLAY.NONE,
        })
    }
  }

  onChangeDebounced() {
    if(this.state.query.trim() !== '') {
      this.props.fetchSearchResults(this.state.query);
      this.setState({localPage: 0});
    } 
    else {
      this.props.searchCleared();
    }
  }

  previous() {
    return {
      display: (this.state.localPage === 0) ? DISPLAY.NONE:DISPLAY.INLINE,
    }
  }

  next() {
    const isLastPage = (this.state.localPage + 1) * LIST_MAX >= this.props.searchResults.animes.length;
    return {
      display: ((this.props.searchResults.isLast && isLastPage) || !this.props.searchResults.animes.length)
        ? DISPLAY.NONE : DISPLAY.INLINE,
    }
  }

  render() {
    return (
      <div className="col-md-9 dropdown">
        <ul className="list-group">
          <input id="input" className="list-group-item dropdown-toggle form-control mr-sm-2"
            type="search" placeholder="Search" aria-label="Search"
            onChange={this._onChange}
            value={this.state.query}
            onMouseDown={this._onFocus} />
          <div className="dropdown-menu w-100" style={{display: this.state.dropdownDisplay}} >
            <RenderResults
                results={this.props.searchResults}
                query={this.state.query}
                localPage={this.state.localPage}
                fetchSearchResults={this.props.fetchSearchResults}
                isLast={this.props.searchResults.isLast}
                nextPage={this.props.searchResults.nextPage} />
            <div className="row px-4 pt-2">
              <span style={{cursor: 'pointer'}}  onClick={() => this.setState({localPage: Math.max(this.state.localPage - 1, 0)})}>
                <span id="previous" className="col-2 badge badge-pill badge-primary" style={this.previous()}>&lt;&lt;previous</span>
              </span>
              <span className="col"></span>
              <span style={{cursor: 'pointer'}} onClick={() => this.setState({localPage: this.state.localPage + 1})}>
                <span id="next" className="col-2 badge badge-pill badge-primary" style={this.next()}>next&gt;&gt;</span>
              </span>
            </div>
          </div>
        </ul>
      </div>
    )
  }
}

function RenderResults ({results, query, localPage, fetchSearchResults, isLast, nextPage}) {
  if(results.failureMessage) {
    return (
      <li className="dropdown-item list-group-item">Failed: {results.failureMessage}</li>
    );
  } else if(results.isLoading) {
    return (
      <li className="dropdown-item list-group-item">Loading...</li>
    );
  } else if(results.animes.length > 0) {

    const displayedResult = results.animes.slice(LIST_MAX * localPage, LIST_MAX * (localPage + 1));

    if(!displayedResult.length && !isLast)
      fetchSearchResults(query, nextPage);
    
    return displayedResult.map(anime => (
      <li className="dropdown-item list-group-item" key={anime.url} >
        <Link to={`/anime/${anime.url}`} >
          <div className="card" style={{maxHeight: '120px'}}>
            <div className="row no-gutters">
              <div className="col-md-4">
                <img src={anime.thumbnail} className="card-img" alt={anime.title} height="120px" width="120px" />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{anime.title}</h5>
                  <p className="card-text">{`${anime.type} - ${anime.year}`}</p>
                  <p className="card-text"><small className="text-muted">{anime.eps} eps</small></p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </li>
    ))
  } else {
    return (
      <li className="dropdown-item list-group-item">Nothing yet...</li>
    );
  }
}

const mapStateToProps = (state) => ({
  searchResults: state.search,
});

const mapDispatchToProps = (dispatch) => ({
  fetchSearchResults: (query, page) => dispatch(fetchSearchResults(query, page)),
  searchCleared: () => dispatch(searchCleared()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
