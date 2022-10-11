import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router';
import { useDispatch, useSelector, } from 'react-redux'; 
import { getAllCats, getAllBreeds, getCat } from './components/catsSlice/catsSlice';
import Layout from './components/layout/Layout';
import Breeds from './pages/breeds/Breeds';
import SingleBreed from './pages/singleBreed/singleBreed';
import Voting from './pages/voting/voting';


function App() {

  const dispatch = useDispatch()
  const filters = useSelector(state => state.filters);

  useEffect(() => {
    dispatch(getAllBreeds())
  },[])

  useEffect(() => {
    dispatch(getAllCats(filters))
  },[filters.limit, filters.breed_ids])

    useEffect(() => {
      dispatch(getCat());
  },[])


  return (
    <Routes>
      <Route path='/' element = {<Layout/>}>
        <Route index  element = { <Voting/>}/>
        <Route path = 'breeds'  element = { <Breeds/> }/>
        <Route path = 'breeds/:id'  element = { <SingleBreed/>}/>
      </Route>
    </Routes>
  );
}

export default App;
