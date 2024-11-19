import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Profile } from './Profile/Profile';
import { EditProfile } from './Profile/EditProfile';



function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Profile />} />
        <Route path='/edit-profile' element={<EditProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
