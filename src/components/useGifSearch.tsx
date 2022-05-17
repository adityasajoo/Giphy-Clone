import axios from 'axios';
import { useEffect, useState } from 'react';
import { Gif } from '../type';

type Props = {
  search: string;
  offset: number;
};

const useGifSearch = ({ search, offset }: Props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [gifs, setGifs] = useState<any[]>([]);

  useEffect(() => {
    setGifs([]);
  }, [search]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel: Function;
    axios({
      method: 'get',
      url: `/.netlify/functions/getGifs?search=${search}&offset=${offset}`,
      cancelToken: new axios.CancelToken(c => (cancel = c)),
    })
      .then(res => {
        setGifs((prev: Gif[]) => {
          return [...new Set([...prev, ...res.data.data])];
        });
        setLoading(false);
      })
      .catch(err => {
        if (axios.isCancel(err)) return;
        console.log(err);
        setError(true);
      });
    return () => cancel();
  }, [search, offset]);
  return { loading, error, gifs };
};

export default useGifSearch;
