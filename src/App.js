import React, { Fragment } from 'react';
import { Routes, Route } from 'react-router'; 
import Layout from './components/layout/Layout';


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element = {<Layout/>}>
         
        </Route>
      </Routes>
    
    </>
  );
}

export default App;
