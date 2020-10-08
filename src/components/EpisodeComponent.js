import React from 'react';
import episode from '../shared/episode.json';

export default function Episode() {
  return (
    <div className="mt-2">
      <div className="episode-info">
        <h2>{episode.title}</h2>
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
            <li className={'list-group-item ' + (episode.isNowPlaying ? 'active': '') } key={episode.title}>{episode.title}</li>
          ))
        }
      </ul>
    </div>
    
  )
}
