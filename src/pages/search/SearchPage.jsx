import './search.scss';
import { useNavigate, useParams } from "react-router-dom";
import PageNav from "../../components/pageNav/pageNav";
import CatList from '../../components/catList/CatList';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { searchByBreedName } from '../../components/catsSlice/catsSlice';

const SearchPage = () => {

    const breedName = useParams().breed;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(searchByBreedName(breedName));
    },[breedName])

    const {searchResults, status} = useSelector((state) => state.cats);

    return (
        <div className="search-results">
            <PageNav title ='search' />
            <div className="search-results__query">
                search results for: <span className="black">{breedName}</span>
            </div>
            <CatList cats = {searchResults} status = {status}/>
        </div>
    )
}

export default SearchPage;