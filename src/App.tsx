import './App.css';
import { useEffect, useState, Suspense, lazy, useRef } from 'react';
import axios from 'axios';
import Loader from './components/Loader';
import React from 'react';
const giphy = require("./giphy.svg") as string;

const GifList = lazy(() => import('./components/GifList'));

function App() {
  const [search, setSearch] = useState('');
  const [gifs, setGifs] = useState([]);
  const offset = useRef(0);
  const [isFetching, setIsFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    offset.current = 0;
    setIsFetching(true);
    try {
      let url;
      if (search != '') {
        url = `/.netlify/functions/getGifs?search=${search}&offset=${offset.current}`;
      } else url = `/.netlify/functions/getGifs?offset=${offset.current}`;

      const res = await axios.get(url);
      setGifs(res.data.data);
    } catch (error) {
      console.log(error);
    }
    setIsFetching(false);
  };

  useEffect(() => {
    console.log('First use effect');
    fetchData();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    if (
      Math.ceil(window.innerHeight + document.documentElement.scrollTop) !==
        document.documentElement.offsetHeight ||
      isFetching
    )
      return;
    setIsFetching(true);
  };

  useEffect(() => {
    console.log('Fetch Use effect');
    if (!isFetching) return;
    fetchMoreListItems();
  }, [isFetching]);

  const fetchMoreListItems = async () => {
    offset.current += 10;

    try {
      let url;
      if (search != '') {
        url = `/.netlify/functions/getGifs?search=${search}&offset=${offset.current}`;
      } else url = `/.netlify/functions/getGifs?offset=${offset.current}`;

      const res = await axios.get(url);
      console.log('Current --->', gifs);
      console.log('Incoming --->', res.data.data);
      setGifs((): any => {
        return [...gifs, ...res.data.data];
      });
    } catch (error) {
      console.log(error);
    }

    setIsFetching(false);
  };

  useEffect(() => {
    console.log('Search use effect');
    const delayDebounceFn = setTimeout(() => {
      console.log(search);
      fetchData();
    }, 3000);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  return (
    <div className='App'>
      <div className='searchBar'>
        <div className='icon'>
          <img src={giphy} alt='logo' className='logo' />
          <p className='logoText'>GIPHY</p>
        </div>
        <input
          className='search'
          type='text'
          placeholder='Search for your favourite'
          onChange={e => setSearch(e.target.value)}
          value={search}
        />
      </div>
      <Suspense fallback={<Loader />}>
        <GifList gifs={gifs} />
      </Suspense>
    </div>
  );
}

export default App;
