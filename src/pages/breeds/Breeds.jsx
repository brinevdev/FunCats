import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import './breeds.scss';
import CatList from '../../components/catList/CatList';
import leftArrow from './../../resourses/img/left-arrow.svg';
import sortInc from './../../resourses/img/sort_inc.svg';
import sortDesc from './../../resourses/img/sort_desc.svg';

const Breeds = () => {
    let navigate = useNavigate()
    return (
     <>
        <div className="breeds-nav">
            <button onClick = {() => navigate(-1)} className="breeds-nav__back">
                <img src={leftArrow} alt="" />
            </button>
            <div className="breeds-nav__lable">
                BREEDS
            </div>
            <select className="breeds-nav__select">
                <option>All breeds</option>
            </select>
            <select className="breeds-nav__select breeds-nav__select_limit">
                <option>All breeds</option>
            </select>
            <button className="breeds-nav__sort">
                <img src={sortInc} alt="" />
            </button>
            <button className="breeds-nav__sort">
                <img src={sortDesc} alt="" />
            </button>
        </div>
        <CatList/>
     </>
    )
}


export default Breeds