import React from 'react';

export default function Failed({retry}) {
  return (
    <div className="container p-3 w-50 mx-auto my-auto" style={{opacity: 0.50}} >
      <div className="row row-centered">
        <div className="col">
          <img width="200px" height="200px" src="/images/Muda.png" alt="" />
        </div>
        <div className="col my-auto">
          <p>Muda Muda Muda Muda Muda  ...
          </p>
          <hr />
          <small>Something went wrong !</small>
        </div>
      </div>
      <div className="row text-center" style={{marginTop: '5px'}} >
        <span className="retry col btn" 
          onClick={retry}
          style={{backgroundColor:' #881798', color: 'white'}} >
          Retry
        </span>
      </div>
    </div>
  )
}
