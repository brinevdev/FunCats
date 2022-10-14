import './search.scss';
import { useState } from 'react';
import searchIcon from './../../resourses/img/search_icon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { changeBreed, searchByBreedName } from '../catsSlice/catsSlice';
import { useNavigate } from 'react-router-dom';

const Search = () => {

    const [search,setSearch] = useState('');
    const breeds = useSelector(state => state.cats.breeds);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const onInputChange = (e) => {
        setSearch(e.target.value);
    }

    const onSearch = () => {
        dispatch(searchByBreedName(search));
        navigate(`search/${search}`)
    }

   return (
    <div className='search'>
        <input 
        type="text" 
        className="search__input" 
        placeholder='Search for breeds by name'
        value = {search}
        onChange = {(e) => onInputChange(e)}
        />
        <button><img src={searchIcon} alt="" className='search__button' onClick={onSearch}/></button>
    </div>
   )
}

export default Search;