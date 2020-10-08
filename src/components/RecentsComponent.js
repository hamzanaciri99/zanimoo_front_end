import React from 'react'

function Recents({recents}) {
  return (
    <div className="row my-4">
      {
        recents.map((episode, idx) => {
          return (
            <RenderEpisode episode={episode} key={idx} />
          );
        })
      }
    </div>
  );
}

function RenderEpisode({episode}) {
  return (
    <div className="card col-2 m-2">
      <img className="card-img-top" src={episode.thumbnail} alt={episode.episodeNum} />
      <div className="card-body">
        <h5 className="card-title">{episode.title.length > 6 ? `${episode.title.substr(0, 6)}...` : episode.title}</h5>
        <h6 className="card-subtitle">{episode.episodeNum}</h6>
      </div>
    </div>
  );
}

export default Recents;
