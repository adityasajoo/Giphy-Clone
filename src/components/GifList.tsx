import React from 'react';
import { Gif } from '../type';
import './GifList.css';

type Props = {
  gifs: Gif[];
  observer: any;
  lastGifsElementRef: any;
};

const GifList = ({ gifs, observer, lastGifsElementRef }: Props) => {
  return (
    <div className='container'>
      {gifs &&
        gifs.map((gif: Gif, index: number) => {
          if (gifs.length === index + 1) {
            return (
              <img
                className='gifs'
                ref={lastGifsElementRef}
                key={gif.id}
                src={gif.image}
                alt="Gif"
              />
            );
          } else {
            return (
              <img className='gifs' key={gif.id + gif.image} src={gif.image} alt="Gif"/>
            );
          }
        })}
    </div>
  );
};

export default GifList;
