import React from 'react';
import './GifList.css';

type Props = {
  gifs: any;
};

const GifList = ({ gifs }: Props) => {
  console.log(gifs);

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
