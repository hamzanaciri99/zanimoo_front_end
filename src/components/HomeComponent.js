import React from 'react'
import { connect } from 'react-redux';
import { fetchRecents } from '../redux/actions/recents';
import { fetchPopular } from '../redux/actions/popular';
import { fetchLastAdded } from '../redux/actions/lastAdded';
import { fetchTrends } from '../redux/actions/trends';
import { Link } from 'react-router-dom';
import Loading from './LoadingComponent';
import Failed from './FailedComponent';
import '../stylesheets/Home.css';
import { Activity, BarChart, Award, Clock } from 'react-feather';

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
      <div className="home container-fluid">
        <div className="big-title">
        <Activity className="icons rotate" />
        <h1>Recent episodes</h1>
        </div>
        <RenderRecentEpisodes recents={this.props.recents} retry={this.props.fetchRecents} />
        <div className="big-title">
          <BarChart className="icons rotate" />
          <h1>Trending animes (24h)</h1>
        </div>
        <RenderExtras extra={this.props.trends} retry={this.props.fetchTrends} />
        <div className="big-title">
          <Award className="icons rotate" />
          <h1>All time popular</h1>
        </div>
        <RenderExtras extra={this.props.popular} retry={this.props.fetchPopular} />
        <div className="big-title">
          <Clock className="icons rotate" />
          <h1>Latest Anime Added</h1>
        </div>
        <RenderExtras extra={this.props.lastAdded} retry={this.props.fetchLastAdded} />
      </div>
    );
  }
}

function RenderRecentEpisodes({recents, retry}) {
  if(recents.isLoading) {
    return (
      <Loading />
    );
  } else if (recents.failureMessage) {
    return (
      <Failed retry={retry} />
    );
  } else {
    return (
      <div className="episodes row my-4">
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
    <div className="episode-card card col-lg-2 col-md-3 m-2">
      <Link to={`/episode/${episode.url}`}>
        <img className="card-img-top" src={episode.thumbnail} alt={episode.episodeNum} />
        <div className="card-body">
          <p className="card-title">{episode.title}</p>
          <small className="card-subtitle">{episode.episodeNum}</small>
        </div>
      </Link>
    </div>
  );
}

function RenderExtras({extra, retry}) {
  if(extra.isLoading) {
    return (
      <Loading />
    );
  } else if (extra.failureMessage) {
    return (
      <Failed retry={retry} />
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
    <div className="anime-card card bg-light border-dark col-lg-2 col-md-3 m-2">
      <Link to={`/anime/${anime.url}`}>
        <img className="card-img-top" src={anime.thumbnail} alt={anime.title} />
        <div className="card-body">
          <h6 className="card-title">{anime.title}</h6>
          <small className="card-text">
            {anime.details}
            <span style = {{display: 'block'}}>
              {(anime.rating) ? anime.rating: ''}
            </span>
          </small>
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
