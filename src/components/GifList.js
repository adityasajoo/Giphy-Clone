import React from 'react';
import './GifList.css';

const GifList = ({ gifs }) => {
  console.log(gifs);

  return (
    <div className='container'>
      {gifs &&
        gifs.map(gif => (
          <img className='gifs' key={gif.id} src={gif.images.original.url} />
        ))}
    </div>
  );
};

export default GifList;
