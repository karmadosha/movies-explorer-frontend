import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import Main from '../Main/Main';
import Profile from '../Profile/Profile';
import './App.css';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import Movies from '../Movies/Movies';
import SavedMovies from '../Movies/SavedMovies/SavedMovies';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import * as api from '../../utils/MainApi';
import { errorMessages, infoMessages } from '../../utils/constants';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [likedMovies, setLikedMovies] = useState([]);  
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [infoMessage, setInfoMessage] = useState('');  

  const location = useLocation();
  const navigate = useNavigate();

  function closePopup() {
    setInfoTooltipOpen(false);
  };

  function handleInfoMessage(text) {
    setErrorMessage('');
    setInfoMessage(text);
    setInfoTooltipOpen(true);
  };

  function handleErrorMessage(text) {
    setInfoMessage('');
    setErrorMessage(text);
    setInfoTooltipOpen(true);
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');          
      api.checkToken(token)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setCurrentUser(res);              
            if (location.pathname !== '/signin') {
              navigate(location.pathname, { replace: true });
            }
          }
        })
        .catch(err => console.log(err));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {    
    if (isLoggedIn) {
      api.getUserInfo()
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.log(`загрузка информации о пользователе: ${err}`)
        });
            
      api.getMovies()
        .then((userMovies) => {
          setLikedMovies(userMovies);
          localStorage.setItem('userMovies', JSON.stringify(userMovies));
        })
        .catch((err) => {
          console.log(`Ошибка загрузки фильмов: ${err}`)
        })
    }
  }, [isLoggedIn]);      

  function handleRegister(values) {
    const { name, email, password } = values;
    isLoading(true);  
    api.register({ name, email, password })
      .then(() => handleLogin({ email, password}))
      .catch((err) => {
        console.log(err);
        (err === 'Ошибка: 409') ? handleErrorMessage(errorMessages.sameEmail) : handleErrorMessage(errorMessages.registryError);
      })
      .finally(() => {
        isLoading(false);
      })   
  };

  function handleLogin(values) {
    const { email, password } = values;
    isLoading(true);  
    api.signin({ email, password })
      .then((res) => {
        if (res) {          
          setIsLoggedIn(true);
          localStorage.setItem('token', res.token);
          console.log(res);
          setCurrentUser(res);                   
          handleInfoMessage(location.pathname === '/signup' ? infoMessages.register : infoMessages.login );
          navigate('/movies', { replace: true });
        }        
      })
      .catch((err) => {
        setIsLoggedIn(false);
        (err === 'Ошика: 401') ? handleErrorMessage(errorMessages.wrongNamePassword) : handleErrorMessage(errorMessages.authError);
      })
      .finally(() => {
        isLoading(false);
      })
  };

  function handleLogout() {
    setIsLoggedIn(false);
    setCurrentUser({});
    navigate('/', { replace: true }); 
    localStorage.clear();
    setLikedMovies([]);
    handleInfoMessage(infoMessages.signout);    
  };  

  function handleUserInfoUpdate({name, email}) {
    isLoading(true);  
    api.updateUserInfo({name, email})
      .then((res) => {
        setCurrentUser(res);
        handleInfoMessage(infoMessages.profileEdit);
      })
      .catch((err) => {
        err === 'Ошибка: 409' ? handleErrorMessage(errorMessages.sameEmail) : handleErrorMessage(errorMessages.profileEditFailed)
      })
      .finally(() => {
        isLoading(false);
      })
  };

  function handleSaveMovie(movie) {
    api.saveMovie(movie)
      .then((res) => {
        setLikedMovies([res, ...likedMovies]);
        handleInfoMessage(infoMessages.saveMovie);
      })
      .catch((err) => {
        console.log(err);        
      })
  };
 
  function handleDeleteMovie(movie) {
    api.deleteMovie(movie._id)
      .then(() => {
        const newLikedMovies = likedMovies.filter((m) => m._id !== movie._id);        
        setLikedMovies(newLikedMovies);
        handleInfoMessage(infoMessages.deleteMovie);
      })
      .catch(err => console.log(err));
  }
  
  return (
    <CurrentUserContext.Provider value={currentUser}>            
      <div className='body'>
        <div className="page">
          <Routes>
            <Route path='/signup'
               element={isLoggedIn 
                 ? <Navigate to='/' /> 
                 : <Register onRegister={handleRegister} onLoading={isLoading}/>} />
              <Route path='/signin'
                 element={isLoggedIn 
                   ? <Navigate to='/' /> 
                   : <Login onLogin={handleLogin} onLoading={isLoading}/>} />
              <Route path='/' 
                element={<Main isLoggedIn={isLoggedIn} />
                }
              />
              <Route path='/profile' element={
                <ProtectedRoute                  
                  element={Profile}
                  isLoggedIn={isLoggedIn}                  
                  user={currentUser}
                  onLogout={handleLogout}
                  onProfileUpdate={handleUserInfoUpdate}
                  onLoading={isLoading}                  
                  handleInfoMessage={handleInfoMessage}
                  handleErrorMessage={handleErrorMessage}
                />
                }
              />
              <Route
               path='/movies' 
               element={
                 <ProtectedRoute
                  element={Movies} 
                  isLoggedIn={isLoggedIn}                  
                  likedMovies={likedMovies}
                  onLikeClick={handleSaveMovie}
                  onDeleteClick={handleDeleteMovie}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  handleInfoMessage={handleInfoMessage}
                  handleErrorMessage={handleErrorMessage}
                /> }
              />
              <Route
               path='/saved-movies' 
               element={
                 <ProtectedRoute
                  element={SavedMovies} 
                  isLoggedIn={isLoggedIn}                     
                  likedMovies={likedMovies}
                  setLikedMovies={setLikedMovies}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  onDeleteClick={handleDeleteMovie}
                  handleInfoMessage={handleInfoMessage}
                  handleErrorMessage={handleErrorMessage}
                /> } 
              />
              <Route path='/*' element={<NotFound />} />
            </Routes>
            <InfoTooltip
              isOpen={isInfoTooltipOpen}
              onClose={closePopup}
              errorMessage={errorMessage}
              infoMessage={infoMessage}
            />
          </div>
        </div>      
    </CurrentUserContext.Provider>
  );
}

export default App;
