import React from 'react'
import { connect } from 'react-redux';
import { fetchRecents } from '../redux/actions/recents';
import { fetchPopular } from '../redux/actions/popular';
import { fetchLastAdded } from '../redux/actions/lastAdded';
import { fetchTrends } from '../redux/actions/trends';
import { Link } from 'react-router-dom';
import Loading from './LoadingComponent';

class Home extends React.Component {

  componentDidMount() {
    if(!this.props.recents.episodes.length || this.props.recents.episodes.length === 0)
      this.props.fetchRecents();
    if(!this.props.popular.animes.length || this.props.popular.animes.length === 0)
      this.props.fetchPopular();
    if(!this.props.lastAdded.animes.length || this.props.lastAdded.animes.length === 0)
      this.props.fetchLastAdded();
    if(!this.props.trends.animes.length || this.props.trends.animes.length === 0)
      this.props.fetchTrends();
  };


  render() {
    return(
      <React.Fragment>
        <h1>Recent episodes:</h1>
        <RenderRecentEpisodes recents={this.props.recents} />
        <hr />
        <h1>Trending animes (24h):</h1>
        <RenderExtras extra={this.props.trends} />
        <hr />
        <h1>All time popular:</h1>
        <RenderExtras extra={this.props.popular} />
        <hr />
        <h1>Latest Anime Added:</h1>
        <RenderExtras extra={this.props.lastAdded} />
      </React.Fragment>
    );
  }
}

function RenderRecentEpisodes({recents}) {
  if(recents.isLoading) {
    return (
      <Loading />
    );
  } else if (recents.failureMessage) {
    return (
      <h1>Failed: {recents.failureMessage}</h1>
    );
  } else {
    return (
      <div className="row my-4">
        {
          recents.episodes.map((episode, idx) => {
            return (
              <RenderEpisode episode={episode} key={idx} />
            );
          })
        }
      </div>
    );
  }
}

function RenderEpisode({episode}) {
  return (
    <div className="card col-lg-2 col-md-3 m-2">
      <Link to={`/episode/${episode.url}`}>
        <img className="card-img-top" src={episode.thumbnail} alt={episode.episodeNum} />
        <div className="card-body">
          <h5 className="card-title">{episode.title.length > 6 ? `${episode.title.substr(0, 6)}...` : episode.title}</h5>
          <h6 className="card-subtitle">{episode.episodeNum}</h6>
        </div>
      </Link>
    </div>
  );
}

function RenderExtras({extra}) {
  if(extra.isLoading) {
    return (
      <Loading />
    );
  } else if (extra.failureMessage) {
    return (
      <h1>Failed: {extra.failureMessage}</h1>
    );
  } else {
    return (
      <div className="row my-4">
        {
          extra.animes.map((anime, idx) => {
            return (
              <RenderAnime anime={anime} key={idx} />
            );
          })
        }
      </div>
    );
  }
}

function RenderAnime({anime}) {
  return (
    <div className="card bg-light border-dark col-lg-2 col-md-3 m-2">
      <Link to={`/anime/${anime.url}`}>
        <img className="card-img-top" src={anime.thumbnail} alt={anime.title} />
        <div className="card-body">
          <h5 className="card-title">{anime.title}</h5>
          <h6 className="card-subtitle">
            {anime.details}
            <span style = {{display: 'block'}}>
              {(anime.rating) ? anime.rating: ''}
            </span>
          </h6>
        </div>
      </Link>
    </div>
  );
}

const mapStateToProps = (state) => ({
  recents: state.recents,
  popular: state.popular,
  lastAdded: state.lastAdded,
  trends: state.trends,
});

const mapDispatchToProps = (dispatch) => ({
  fetchRecents: () => dispatch(fetchRecents()),
  fetchPopular: () => dispatch(fetchPopular()),
  fetchLastAdded: () => dispatch(fetchLastAdded()),
  fetchTrends: () => dispatch(fetchTrends()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
