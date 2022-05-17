const { default: axios } = require('axios');

exports.handler = async (event, context) => {
  const API_KEY = 'vJCLdyLl8TwB1Znr2TLHehwEvIsdpi4V';
  const search = event.queryStringParameters.search;
  const offset = event.queryStringParameters.offset
    ? event.queryStringParameters.offset
    : 0;
  let url;
  if (search) {
    url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${search}&limit=9&offset=${offset}`;
  } else
    url = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=9&offset=${offset}`;

  try {
    const res = await axios.get(url);
    const data = res.data.data;
    const d = data.map(datum => {
      return {
        id: datum.id,
        image: datum.images.original.url,
      };
    });
    return {
      statusCode: 200,
      body: JSON.stringify({
        data: d,
      }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers':
          'Origin, X-Requested-With, Content-Type, Accept',
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: error,
      }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers':
          'Origin, X-Requested-With, Content-Type, Accept',
      },
    };
  }
};
