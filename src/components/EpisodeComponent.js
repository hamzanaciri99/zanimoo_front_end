import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {fetchEpisode} from '../redux/actions/episode';
import Loading from './LoadingComponent';

class Episode extends React.Component {

  componentDidMount() {
    this.props.fetchEpisode(this.props.match.params.slug);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.slug !== prevProps.match.params.slug) {
      this.props.fetchEpisode(this.props.match.params.slug);
    }
  }
  
  render() {

    if(this.props.episode.isLoading) {
      return (
        <Loading />
      );
    } else if(this.props.episode.failureMessage) {
        return (
          <h1>FAILED: {this.props.episode.failureMessage}</h1>
        );
    } else {
      const episode = this.props.episode.episode;
      return (
        <div className="mt-2">
          <div className="episode-info">
            <h2>
              <Link to={`/anime/${episode.animeUrl}`}>{episode.title}</Link>
            </h2>
            <h3>{episode.num}</h3>
            <p>
              <span className="badge badge-pill badge-success">{episode.aired}</span>
              <span className="badge badge-pill badge-primary ml-1">{episode.type}</span>
            </p>
          </div>
          <div className="embed-responsive embed-responsive-16by9">
            <iframe className="embed-responsive-item" src={episode.players[0].iframe} title={episode.title}></iframe>
          </div>
          <ul className="list-group my-2">
            {
              episode.episodeList.map((episode) => (
                <li className={'list-group-item ' + (episode.isNowPlaying ? 'active': '') } key={episode.title}>
                  <Link to={`/episode/${episode.url}`}>{episode.title}</Link>
                </li>
              ))
            }
          </ul>
        </div>
        
      )
    }
  }
}

const mapStateToProps = (state) => ({
  episode: state.episode,
});

const mapDispatchToProps = (dispatch) => ({
  fetchEpisode: (slug) => dispatch(fetchEpisode(slug)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Episode);
