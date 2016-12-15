import "isomorphic-fetch";

export default function tree(req) {
  return fetch('http://localhost:8000/api/regions/tree')
    .then((response) => response.json())
}
