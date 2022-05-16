import React from 'react';
import './GifList.css';

type Gif = {
  id: string;
  image: string;
};

type Gifs = {
  gifs: Gif[];
};

const GifList = ({ gifs }: Gifs) => {
  return (
    <div className='container'>
      {gifs &&
        gifs.map((gif: any) => (
          <img className='gifs' key={gif.id} src={gif.images.original.url} />
        ))}
    </div>
  );
};

export default GifList;
