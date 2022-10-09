import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router';
import { useDispatch, useSelector, } from 'react-redux'; 
import { getAllCats, getAllBreeds } from './components/catsSlice/catsSlice';
import Layout from './components/layout/Layout';
import Breeds from './pages/breeds/Breeds';


function App() {
  
  const dispatch = useDispatch()
  const filters = useSelector(state => state.filters);

  useEffect(() => {
    dispatch(getAllBreeds())
  },[])

  useEffect(() => {
    dispatch(getAllCats(filters))
  },[filters.limit, filters.breed_ids])


  return (
    <Routes>
      <Route path='/' element = {<Layout/>}>
        <Route path = 'breeds'  element = { <Breeds/> }/>
      </Route>
    </Routes>
  );
}

export default App;
