import React, { Component } from 'react';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import { fetchSearchResults, searchCleared } from '../redux/actions/search';
import { Link } from 'react-router-dom';
import Failed from './FailedComponent';
import Loading from './LoadingComponent';
import '../stylesheets/Search.css';
import { ArrowLeftCircle, ArrowRightCircle } from 'react-feather';

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
        event.target !== document.getElementById('previousIcon') &&
        event.target !== document.getElementById('nextIcon') && 
        !event.target.classList.contains('retry') &&
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
      <div className="col dropdown">
        <ul className="list-group">
          <div className="row icon-search">
            <i data-feather="search"></i>
            <input id="input" className="col list-group-item dropdown-toggle"
              type="search" placeholder="Search for Anime, Movie, Ova... etc" aria-label="Search"
              onChange={this._onChange}
              value={this.state.query}
              onMouseDown={this._onFocus} />
          </div>
          
          <div className="dropdown-menu w-100" style={{display: this.state.dropdownDisplay}} >
            <RenderResults
                results={this.props.searchResults}
                query={this.state.query}
                localPage={this.state.localPage}
                fetchSearchResults={this.props.fetchSearchResults}
                isLast={this.props.searchResults.isLast}
                nextPage={this.props.searchResults.nextPage} />
            <div className="row py-2 search-btns">
              <span className="col-2" style={{cursor: 'pointer'}}  onClick={() => this.setState({localPage: Math.max(this.state.localPage - 1, 0)})}>
                <span id="previous" className=" badge badge-pill badge-primary" style={this.previous()}><ArrowLeftCircle id="previousIcon" />Previous page</span>
              </span>
              <span className="page-counter col text-center" style={{display: (this.state.localPage > 0) ? DISPLAY.INLINE:DISPLAY.NONE}} >Page: {this.state.localPage}</span>
              <span className="col" style={{display: !(this.state.localPage > 0) ? DISPLAY.INLINE:DISPLAY.NONE}} ></span>
              <span className="col-2" style={{cursor: 'pointer'}} onClick={() => this.setState({localPage: this.state.localPage + 1})}>
                <span id="next" className="col-2 badge badge-pill badge-primary" style={this.next()}>Next page<ArrowRightCircle id="nextIcon" /></span>
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
      <Failed retry={() => fetchSearchResults(query)} />
    );
  } else if(results.isLoading) {
    return (
      <Loading />
    );
  } else if(results.animes.length > 0) {

    const displayedResult = results.animes.slice(LIST_MAX * localPage, LIST_MAX * (localPage + 1));

    if(!displayedResult.length && !isLast)
      fetchSearchResults(query, nextPage);
    
    return displayedResult.map(anime => (
      <li className="dropdown-item list-group-item" key={anime.url} >
        <Link to={`/anime/${anime.url}`} >
          <div className="row no-gutters">
            <div className="col-1 my-auto p-2">
              <img src={anime.thumbnail} alt={anime.title} width="50px" height="50px" />
            </div>
            <div className="col my-auto">
              <div className="search-text">
                <span className="search-title">{anime.title}</span>
                <span className="search-detail">{`${anime.type} - ${anime.year}`}</span>
              </div>
            </div>
            <div className="col-1 my-auto">
              <span className="eps">{anime.eps} eps</span>
            </div>
          </div>
        </Link>
      </li>
    ))
  } else {
    return (
      <span className="nothing">Enter Anime name ... </span>
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
