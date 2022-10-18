import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router';
import { useDispatch, useSelector, } from 'react-redux'; 
import { getAllCats, getAllBreeds, getCat} from './components/catsSlice/catsSlice';
import { getGallery } from './pages/gallery/gallerySlice';
import Layout from './components/layout/Layout';
import Breeds from './pages/breeds/Breeds';
import SingleBreed from './pages/singleBreed/singleBreed';
import Voting from './pages/voting/voting';
import SearchPage from './pages/search/SearchPage';
import Votes from './pages/votes/Votes';
import Gallery from './pages/gallery/Gallery';



function App() {

  const dispatch = useDispatch()
  const {catsFilters} = useSelector(state => state.cats);
  const {galleryFilters} = useSelector(state => state.gallery);


  useEffect(() => {
    dispatch(getAllBreeds())
  },[])

  useEffect(() => {
    dispatch(getAllCats(catsFilters))
  },[catsFilters.limit, catsFilters.breed_ids])

  useEffect(() => {
    dispatch(getGallery(galleryFilters))
  },[galleryFilters.limit, galleryFilters.breed_ids, galleryFilters.mime_types])

    useEffect(() => {
      dispatch(getCat());
  },[])


  return (
    <Routes>
      <Route path='/' element = {<Layout/>}>
        <Route index  element = { <Voting/>}/>
        <Route path = 'breeds'  element = { <Breeds/> }/>
        <Route path = 'breeds/:id'  element = { <SingleBreed/>}/>
        <Route path = 'search/:breed'  element = { <SearchPage/>}/>
        <Route path = 'likes'  element = { <Votes type = {'likes'}/>}/>
        <Route path = 'dislikes'  element = { <Votes type = 'dislikes'/>}/>
        <Route path = 'favorites' element = {<Votes type = 'favorites'/>}/>
        <Route path = 'gallery' element = {<Gallery/>}/>
      </Route>
    </Routes>
  );
}

export default App;
