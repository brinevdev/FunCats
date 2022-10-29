import './breeds.scss';
import PageNav from '../../components/pageNav/pageNav';
import CatList from '../../components/catList/CatList';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeBreed, changeLimit} from '../../components/catsSlice/catsSlice';
import { useEffect, useRef } from 'react';

const Breeds = () => {

    const {cats, breeds, status, catsFilters} = useSelector(state => state.cats);
    const selectBreed = useRef(null);
    const selectLimit = useRef(null);
   

    let dispatch = useDispatch()
    let breedsOptions = breeds.map((breed) => {
        return <option key = {breed.id} value = {breed.id}>{breed.name}</option>
    })

    useEffect(() => {
        if (catsFilters.limit && selectLimit.current) {
            const selectedItemIndex = Array.from(selectLimit.current.options).findIndex((option) => option.value == catsFilters.limit);
            selectLimit.current.selectedIndex = selectedItemIndex;
        }
        if (catsFilters.breed_ids && selectBreed.current) {
            const selectedItemIndex = Array.from(selectBreed.current.options).findIndex((option) => option.value == catsFilters.breed_ids);
            selectBreed.current.selectedIndex = selectedItemIndex;
        }
    })



    return (
     <div className='breeds'>
        <div className="breeds-nav">
            <PageNav title = 'breeds'/> 
            <div className="breeds-nav__menu">
                <select  ref = {selectBreed} className="breeds-nav__select" onChange = {(e) => {
                    dispatch(changeBreed(e.target.value))
                    }}>
                    <option value = {''}>All breeds</option>
                    {breedsOptions}
                </select>
                <select ref = {selectLimit} className="breeds-nav__select breeds-nav__select_limit" onChange={(e) => dispatch(changeLimit(e.target.value))}>
                    <option value='5'>Limit: 5</option>
                    <option value='10'>Limit: 10</option>
                    <option value='15'>Limit: 15</option>
                    <option value='20'>Limit: 20</option>
                </select>
            </div>
        </div>
        <CatList status = {status}>
                {cats.map((cat) => <Cat {...cat} key = {cat.id} />)}
        </CatList>
     </div>
    )
}


export default Breeds



function Cat({id, breedName, url}){
    return (
        <div className={`cat-list__item`}>
            <Link to = {`/breeds/${id}`} className="cat-list__name">{breedName}</Link>
            <Link to = {`/breeds/${id}`}><img src={url} alt={breedName}/></Link>
        </div>
    )
}