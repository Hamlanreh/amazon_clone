import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import './Loading.css';

const Loading = () => {
  return (
    <div className="loading">
      <CircularProgress sx={{ color: 'orange' }} />
    </div>
  );
};

export default Loading;
