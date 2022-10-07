import React, { Fragment } from 'react';
import { Routes, Route } from 'react-router'; 
import Layout from './components/layout/Layout';
import Breeds from './pages/breeds/Breeds';


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element = {<Layout/>}>
          <Route path = 'breeds'  element = { <Breeds/> }/>
        </Route>
      </Routes>
    
    </>
  );
}

export default App;
