import logo from './logo.svg';
import './App.css';
// import Users from ;
// import NewPlace from './places/pages/newPlace';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MainNavigation from './shared/components/navigation/mainNavigation';
// import UserPlaces from './places/pages/UserPlaces';
// import UpdatePlace from './places/pages/UpdatePlace';
// import Auth from './user/pages/Auth';
import React, { Suspense  } from 'react';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
import Home from './user/pages/home';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';

const Users = React.lazy( () => import('./user/pages/Users'));
const NewPlace = React.lazy( () => import('./places/pages/newPlace'));
const UserPlaces = React.lazy( () => import('./places/pages/UserPlaces'));
const UpdatePlace = React.lazy( () => import('./places/pages/UpdatePlace'));
const Auth = React.lazy( () => import('./user/pages/Auth'));

const App = () => {
  const { token, login, logout, userId } = useAuth();

  let routes;

  if (token) {
    routes = (
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path='/newPlace' element={<NewPlace/>} />
        <Route path="/:userId/places" element={<UserPlaces/>} />
        <Route path="/places/:placeId" element={<UpdatePlace />} />
        <Route path="/auth" element={<Navigate to="/" />} />
        </Routes>
    );
  } else {
    routes = (
      <Routes>
         <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
      <Route path="/users" element={<Users />} />
      <Route path="/:userId/places" element={<UserPlaces/>} />
      <Route path="/newPlace" element={<Navigate to="/auth" />} />
      <Route path="/places/:placeId" element={<Navigate to="/auth" />} />
      
    </Routes>
    );
  }
  return (
    <AuthContext.Provider
    value={{
      isLoggedIn: !!token,
        token: token,
      userId: userId,
      login: login,
      logout: logout
    }}
  >
    <Router>
       <MainNavigation />
       <main><Suspense fallback={<div className='center'><LoadingSpinner /></div>}>{routes}</Suspense></main>
    </Router>
    </AuthContext.Provider>
  );
};
export default App;
