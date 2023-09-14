import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from '../Main/Main';
import Profile from '../Profile/Profile';
import './App.css';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import Movies from '../Movies/Movies';
import SavedMovies from '../Movies/SavedMovies/SavedMovies';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function App() { 
  
  return (
    <div className='body'>
      <div className="page">
        <Routes>
          <Route path='/signup' element={<Register />} />
          <Route path='/signin' element={<Login />} />
          <Route path='/' element={
            <>
              <Header  isLoggedIn={false}/>
              <Main />
              <Footer />
            </>}
          />
          <Route path='/profile' element={
            <>
              <Header isLoggedIn={true} />
              <Profile />
            </>}
          />
          <Route path='/movies' element={
            <>
              <Header isLoggedIn={true} />
              <Movies />
              <Footer />
            </>
            }
          />
          <Route path='/saved-movies' element={
            <>
              <Header isLoggedIn={true} />
              <SavedMovies />
              <Footer />
            </>
            } 
          />
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </div>
    </div>    
  );
}

export default App;
