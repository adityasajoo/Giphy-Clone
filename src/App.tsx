import './App.css';
import { useState, lazy, useRef, useCallback } from 'react';
import Loader from './components/Loader';
import React from 'react';
import useGifSearch from './components/useGifSearch';

const GifList = lazy(() => import('./components/GifList'));

function App() {
  const [search, setSearch] = useState<string>('');
  const [offset, setOffset] = useState<number>(0);
  const { gifs, error, loading } = useGifSearch({ search, offset });

  const observer = useRef<any>();
  const lastGifsElementRef = useCallback(
    (node: any) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          setOffset(prev => prev + 20);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  const handleSearch = (value: string) => {
    setSearch(value);
    setOffset(0);
  };

  return (
    <div className='App'>
      <div className='searchBar'>
        <div className='icon'>
          <p className='logoText'>GIPHY</p>
        </div>
        <input
          className='search'
          type='text'
          placeholder='Search for your favourite'
          onChange={e => handleSearch(e.target.value)}
          value={search}
        />
      </div>

      <GifList
        gifs={gifs}
        observer={observer}
        lastGifsElementRef={lastGifsElementRef}
      />
      {loading && <Loader />}
      {error && <p>"Something went wrong."</p>}
    </div>
  );
}

export default App;
