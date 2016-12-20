import "isomorphic-fetch";

const queryString = require('query-string');

export default function books(req) {
  return fetch('http://localhost:8000/api/books?' + req._parsedUrl.query)
    .then((response) => response.json())
}