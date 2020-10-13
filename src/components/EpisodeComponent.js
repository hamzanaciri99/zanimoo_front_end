import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {fetchEpisode} from '../redux/actions/episode';
import Loading from './LoadingComponent';
import { Tv } from 'react-feather'
import '../stylesheets/Episode.css';
import Failed from './FailedComponent';

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
          <Failed retry={this.props.fetchEpisode} />
        );
    } else {
      const episode = this.props.episode.episode;
      return (
        <div className="episode-container container-fluid">
          <div className="row d-flex">
            <div className="iframe col-12 col-md embed-responsive embed-responsive-21by9">
              <iframe className="embed-responsive-item" src={episode.players[0].iframe} title={episode.title}></iframe>
            </div>
            <div className="wrapper col-12 col-md-2">
              <ul className="list-group scroll">
                {
                  episode.episodeList.map((episode) => {
                    if(episode.isNowPlaying)
                      return (
                        <li className="list-group-item active" key={episode.title}>
                          <Link to={`/episode/${episode.url}`}>
                            <Tv className="now-playin-icon"/>
                            {episode.title}
                          </Link>
                        </li>
                      );
                    return (
                      <li className="list-group-item" key={episode.title}>
                        <Link to={`/episode/${episode.url}`}>
                          {episode.title}
                        </Link>
                      </li>
                    );
                  })
                }
              </ul>
            </div>
          </div>
          <div className="episode-info">
            <h1>
              <Link to={`/anime/${episode.animeUrl}`}>{episode.title}</Link>
            </h1>
            <span>
              <h3>{episode.num}</h3>
              <span className="badge badge-pill badge-success">{episode.aired}</span>
              <span className="badge badge-pill badge-primary ml-1">{episode.type}</span>
            </span>
          </div>
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
