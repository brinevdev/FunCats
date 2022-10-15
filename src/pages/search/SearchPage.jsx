import './search.scss';
import {useParams } from "react-router-dom";
import PageNav from "../../components/pageNav/pageNav";
import CatList from '../../components/catList/CatList';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { searchByBreedName } from '../../components/catsSlice/catsSlice';

const SearchPage = () => {
    const {searchResults = [], status} = useSelector((state) => state.cats);
    const breedName = useParams().breed;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(searchByBreedName(breedName));
    },[breedName])

   

    return (
        <div className="search-results">
            <PageNav title ='search' />
            <div className="search-results__query">
                search results for: <span className="black">{breedName}</span>
            </div>
            <CatList cats = {searchResults} status = {status}>
                {searchResults.map((cat) => <Cat {...cat} key = {cat.id} />)}
            </CatList>
        </div>
    )
}

export default SearchPage;


function Cat({id, breedName, url}){
    return (
        <div className={`cat-list__item`}>
            <Link to = {`/breeds/${id}`} className="cat-list__name">{breedName}</Link>
            <Link to = {`/breeds/${id}`}><img src={url} alt={breedName}/></Link>
        </div>
    )
}