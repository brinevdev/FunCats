import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import './breeds.scss';
import CatList from '../../components/catList/CatList';
import leftArrow from './../../resourses/img/left-arrow.svg';
import { useDispatch, useSelector } from 'react-redux';
import { changeBreed, changeLimit, sortAsc, sortDesc } from '../../components/catsSlice/catsSlice';

const Breeds = () => {
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let {breeds} = useSelector(state => state);

    let breedsOptions = breeds.map((breed) => {
        return <option key = {breed.id} value = {breed.id}>{breed.name}</option>
    })

    return (
     <>
        <div className="breeds-nav">
            <button onClick = {() => navigate(-1)} className="breeds-nav__back">
                <img src={leftArrow} alt="" />
            </button>
            <div className="breeds-nav__lable">
                BREEDS
            </div>
            <select className="breeds-nav__select" onChange = {(e) => {
                console.log(e);
                dispatch(changeBreed(e.target.value))
                }}>
                <option value = {''}>All breeds</option>
                {breedsOptions}
            </select>
            <select className="breeds-nav__select breeds-nav__select_limit" onChange={(e) => dispatch(changeLimit(e.target.value))}>
                <option value='5'>Limit: 5</option>
                <option value='10'>Limit: 10</option>
                <option value='15'>Limit: 15</option>
                <option value='20'>Limit: 20</option>
            </select>
        </div>
        <CatList/>
     </>
    )
}


export default Breeds