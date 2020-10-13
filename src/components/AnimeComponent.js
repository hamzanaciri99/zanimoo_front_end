import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAnime } from '../redux/actions/anime';
import Loading from './LoadingComponent';
import '../stylesheets/Anime.css'
import Failed from './FailedComponent';


class Anime extends React.Component {

  componentDidMount() {
    this.props.fetchAnime(this.props.match.params.slug);
  }  

  render() {

    if(this.props.anime.isLoading) {
      return (
        <Loading />
      );
    } else if(this.props.anime.failureMessage) {
        return (
          <Failed retry={this.props.fetchAnime} />
        );
    } else {
      const anime = this.props.anime.anime;
      const animeDetails = [];
      for (const [key, val] of Object.entries(anime.details)) {
        animeDetails.push({key, val});
      }
      return (
        <div className="anime container-fluid mt-2">
          <div className="row">
            <div className="col-sm col-md-2 entity img-ent">
              <div className="card">
                <img className="card-img-top" src={anime.thumbnail} alt={anime.title} />
                <div className="card-body">
                  <h5 className="card-title">{anime.name}</h5>
                  <small className="card-text">{anime.genre} <br/> {anime.year}</small>
                </div>
              </div>
            </div>
            <div className="col" >
              <div className="row entity summary-ent">
                <strong className="summary">Summary</strong>
                <p>{anime.summary}</p>
              </div>
              <div className="row entity" style={{display: 'block'}} >
                <div className="row">
                  <div className="col row">
                    <div className="col-md-2 col-sm-4">
                      <strong>Tags</strong>
                    </div>
                    <p className="col">
                    {
                      anime.tags.map((tag) => (
                        <span className="mr-1 badge badge-primary" key={tag}>{tag}</span>
                      ))
                    }
                    </p>
                  </div>
                  <div className="col row">
                    <div className="col-lg-2 col-sm-4">
                      <strong>Rating</strong>
                    </div>
                    <p className="col">
                      {anime.rating}
                    </p>
                  </div>
                </div>
                <RenderDetails details={animeDetails} />
              </div>
            </div>
          </div>
          <div className="episodes entity">
            <p>Episodes list</p>
            <table className="table table-sm">
              <thead >
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Title</th>
                  <th scope="col">Airing Date</th>
                </tr>
              </thead>
              <tbody>
                {
                  anime.episodes.map(episode => (
                      <tr className={(!episode.url) ? 'disabled' : ''} key={episode.num}>
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
        </div>
      );
    }
  }
}

const RenderDetails = ({details}) => {
  const groupedDetails = [];
  for(let i = 0; i < details.length; i += 2) {
    if(i + 1 < details.length) {
      groupedDetails.push(
        <div className="row" key={i}>
          <div className="col row">
            <div className="col-md-2 col-sm-4">
              <strong>{details[i].key}</strong>
            </div>
            <p className="col">
              {details[i].val}
            </p>
          </div>
          <div className="col row">
            <div className="col-md-2 col-sm-4">
              <strong>{details[i + 1].key}</strong>
            </div>
            <p className="col">
              {details[i + 1].val}
            </p>
          </div>
        </div>
      );
    } else {
      groupedDetails.push(
        <div className="row">
          <div className="col row">
            <div className="col-md-2 col-sm-4">
              <strong>{details[i].key}</strong>
            </div>
            <p className="col">
              {details[i].val}
            </p>
          </div>
        </div>
      );
    }
  }
  return groupedDetails;
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
