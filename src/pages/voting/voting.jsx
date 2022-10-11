import './voting.scss';
import PageNav from '../../components/pageNav/pageNav';
import { useDispatch, useSelector } from 'react-redux';
import { Fragment, useEffect } from 'react';
import { getCat } from '../../components/catsSlice/catsSlice';
import {ReactComponent as Like} from './../../resourses/img/like_smile.svg';
import {ReactComponent as Favorite} from './../../resourses/img/heart_smile.svg';
import {ReactComponent as Dislike} from './../../resourses/img/dislike_smile.svg';

const Voting = () => {

    const dispatch = useDispatch();
    const catImage = useSelector(state => state.cat);

    
    
    return (
        <Fragment>
            <PageNav title = 'voting'/>
            <div className="voting">
                <div className="voting__image">
                    <img className="voting__cat" src={catImage.url} alt="" />
                    <div className="voting__control control">
                        <button className="control__item"><Like fill='#fff'/></button>
                        <button className="control__item"><Favorite fill='#fff'/></button>
                        <button className="control__item"><Dislike fill='#fff' /></button>
                    </div>
                </div>
            </div> 
        </Fragment>
        
    ) 
    
}

export default Voting;