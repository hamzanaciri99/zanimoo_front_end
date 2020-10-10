import React from 'react'
import { connect } from 'react-redux';
import { fetchRecents } from '../redux/actions/recents';
import { Link } from 'react-router-dom';
import Loading from './LoadingComponent';

class Recents extends React.Component {

  componentDidMount() {
    if(!this.props.recents.episodes.length || this.props.recents.episodes.length === 0)
      this.props.fetchRecents();
  };


  render() {
    if(this.props.recents.isLoading) {
      return (
        <Loading />
      );
    } else if (this.props.recents.failureMessage) {
      return (
        <h1>Failed: {this.props.recents.failureMessage}</h1>
      );
    } else {
      return (
        <div className="row my-4">
          {
            this.props.recents.episodes.map((episode, idx) => {
              return (
                <RenderEpisode episode={episode} key={idx} />
              );
            })
          }
        </div>
      );
    }
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

const mapStateToProps = (state) => ({
  recents: state.recents
});

const mapDispatchToProps = (dispatch) => ({
  fetchRecents: () => dispatch(fetchRecents()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Recents);
