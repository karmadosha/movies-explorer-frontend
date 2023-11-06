import { MOVIES_URL } from "./constants";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const getAllMovies = () => {
  return fetch (`${MOVIES_URL}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },    
  })
  .then(res => checkResponse(res));
};