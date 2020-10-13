import React from 'react';
import { Loader } from 'react-feather';
import '../stylesheets/index.css';

export default function Loading() {
  return (
    <div>
      <Loader className="rotate loading"></Loader>
    </div>
  )
}
