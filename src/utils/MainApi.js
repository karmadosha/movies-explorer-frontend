import { MAIN_URL } from "./constants";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const register = ({ name, email, password }) => {
  return fetch (`${MAIN_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name, email, password})
  })
  .then(res => checkResponse(res));
};

export const signin = ({ email, password }) => {
  return fetch (`${MAIN_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  .then(res => checkResponse(res));  
};

export const checkToken = () => {
  return fetch (`${MAIN_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
    }
  })
  .then(res => checkResponse(res))
}

export const getUserInfo = () => {
  return fetch (`${MAIN_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
  .then(res => checkResponse(res))
}

export const updateUserInfo = ({email, name}) => {
  return fetch (`${MAIN_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({
      email: email,
      name: name,
    })
  })
  .then(res => checkResponse(res));
}

export const getMovies = () => {
  return fetch (`${MAIN_URL}/movies`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
  .then(res => checkResponse(res));
}

export const saveMovie = (movie) => {
  return fetch (`${MAIN_URL}/movies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
      director: movie.director,
      country: movie.country,
      year: movie.year,
      duration: movie.duration, 
      description: movie.description, 
      trailerLink: movie.trailerLink, 
      image: `https://api.nomoreparties.co${movie.image.url}`,
      thumbnail: `https://api.nomoreparties.co${movie.image.url}`,
    })
  })
  .then(res => checkResponse(res));
}

export const deleteMovie = (movieId) => {
  return fetch (`${MAIN_URL}/movies/${movieId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${localStorage.getItem('token')}`
    }    
  })
  .then(res => checkResponse(res));
}
