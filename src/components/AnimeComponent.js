import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAnime } from '../redux/actions/anime';
import Loading from './LoadingComponent';


class Anime extends React.Component {

  componentDidMount() {
    this.props.fetchAnime(this.props.match.params.slug);
  }  

  render(){

    if(this.props.anime.isLoading) {
      return (
        <Loading />
      );
    } else if(this.props.anime.failureMessage) {
        return (
          <h1>FAILED: {this.props.anime.failureMessage}</h1>
        );
    } else {
      const anime = this.props.anime.anime;
      const animeDetails = [];
      for (const [key, val] of Object.entries(anime.details)) {
        animeDetails.push({key, val});
      }
      return (
        <div className="mt-2">
          <div className="card my-2">
            <div className="card-header">
              <h2 className="card-title">{anime.name}</h2>
              <h3>{anime.genre} . {anime.year}</h3>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-2 col-sm-4">
                  <strong>Tags</strong>
                </div>
                <p>
                {
                  anime.tags.map((tag) => (
                    <span className="mr-1 badge badge-primary" key={tag}>{tag}</span>
                  ))
                }
                </p>
              </div>
              <div className="row">
                <div className="col-lg-2 col-sm-4">
                  <strong>Rating</strong>
                </div>
                <p>
                  {anime.rating}
                </p>
              </div>
              <div className="row">
                <div className="col-lg-2 col-sm-4">
                  <strong>Summary:</strong>
                </div>
                <p>
                  {anime.summary}
                </p>
              </div>
              {
                animeDetails.map((detail) => (
                  <div className="row" key={detail.key}>
                    <div className="col-lg-2 col-sm-4">
                      <strong>{detail.key}</strong>
                    </div>
                    <p>
                      {detail.val}
                    </p>
                  </div>
                ))
              }
            </div>
          </div>
          <h2>Episodes list:</h2>
          <table className="table table-sm">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Airing Date</th>
              </tr>
            </thead>
            <tbody>
              {
                anime.episodes.map(episode => (
                    <tr className={(!episode.url) ? 'table-danger' : ''} key={episode.num}>
                      <td>{episode.num}</td>
                      <td>
                        <SurroundWithLink text={episode.title} url={episode.url} />
                      </td>
                      <td>{episode.airing}</td>
                    </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      );
    }
  }
}

const SurroundWithLink = ({text, url}) => {
  if(url) {
    return (
      <Link to={`/episode/${url}` }>{text}</Link>
    );
  } else {
    return (
      <React.Fragment>
        {text}
      </React.Fragment>
    );
  }
};

const mapStateToProps = (state) => ({
  anime: state.anime,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAnime: (slug) => dispatch(fetchAnime(slug)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Anime);
