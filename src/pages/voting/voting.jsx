import './voting.scss';
import PageNav from '../../components/pageNav/pageNav';
import { useDispatch, useSelector } from 'react-redux';
import { Fragment} from 'react';
import { getCat } from '../../components/catsSlice/catsSlice';
import { addToFavorite, vote } from './votingSlice';
import Log from '../../components/log/Log';
import {ReactComponent as Like} from './../../resourses/img/like_smile.svg';
import {ReactComponent as Favorite} from './../../resourses/img/heart_smile.svg';
import {ReactComponent as Dislike} from './../../resourses/img/dislike_smile.svg';


const Voting = () => {

    const dispatch = useDispatch();
    const catImage = useSelector(state => state.cats.cat);
    const {logs} = useSelector(state => state.vote);
    


    const onLike = (id) => {
        dispatch(vote({ imageId:id, vote:1 }))
        dispatch(getCat());
    }

    const onDislike = (id) => {
        dispatch(vote({ imageId:id,vote:-1 }))
        dispatch(getCat());
    }

    const onFavorite = (id) => {
        dispatch(addToFavorite(id))
        dispatch(getCat());
    }

    const logItems = logs.map((log) => {
       return (
         <Log {...log} key = {log.id} />
       )
    })
  




    return (
        <Fragment>
            <PageNav title = 'voting'/>
            <div className="voting">
                <div className="voting__image">
                    <img className="voting__cat" src={catImage.url} alt="" />
                    <div className="voting__control control">
                        <button onClick={()=>onLike(catImage.id)} className="control__item"><Like fill='#fff'/></button>
                        <button onClick={()=>onFavorite(catImage.id)} className="control__item"><Favorite fill='#fff'/></button>
                        <button onClick={()=>onDislike(catImage.id,-1)}className="control__item"><Dislike fill='#fff' /></button>
                    </div>
                </div>
                <div className="voting__logs logs">
                    {logItems}
                </div>
            </div> 
        </Fragment>
        
    ) 
    
}

export default Voting;