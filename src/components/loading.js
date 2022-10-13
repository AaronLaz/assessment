import React from 'react';
import load from '../assets/loading.gif';
import './loading.css';

// Simple loading component to display a loading gif
export const Loading = () => {

  return (
    <div>
      <img className="loader" src={load} alt="loading" />
    </div>
  );
}