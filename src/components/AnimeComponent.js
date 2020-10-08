import React from 'react';
import anime from '../shared/anime.json';

export default function Anime() {

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
            <div className="col-2">
              <strong>Tags</strong>
            </div>
            <p>
            {
              anime.tags.map((tag) => (
                <span className="mr-1 badge badge-primary">{tag}</span>
              ))
            }
            </p>
          </div>
          <div className="row">
            <div className="col-2">
              <strong>Rating</strong>
            </div>
            <p>
              {anime.rating}
            </p>
          </div>
          <div className="row">
            <div className="col-2">
              <strong>Summary:</strong>
            </div>
            <p>
              {anime.summary}
            </p>
          </div>
          {
            animeDetails.map((detail) => (
              <div className="row">
                <div className="col-2">
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
              <tr className={(!episode.url) ? 'table-danger' : ''}>
                <td>{episode.num}</td>
                <td>{episode.title}</td>
                <td>{episode.airing}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
