import {useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './votes.scss'
import CatList from "../../components/catList/CatList";
import PageNav from "../../components/pageNav/pageNav";
import { getVotes } from "../voting/votingSlice";
import Spinner from "../../components/spinner/Spinner";



const Votes = ({type}) => {

    const dispatch = useDispatch();
    const {likes = [], dislikes = [], getVoteStatus} = useSelector(state => state.vote);
   

    useEffect(() => {
        dispatch(getVotes())
    },[])

    let images = type =='likes' ? likes : dislikes;
    if (images.length == 0) return (
        <div className="votes">
          <PageNav title = {type}/>
            <div className="not-found">No items found</div>
        </div>
    )

    if (getVoteStatus == 'loading') return  (
    <div className="votes">
       <PageNav title = {type}/>
        <Spinner/>
     </div>
     )


    images = images.map((like,index)=><Cat {...like} key = {index}/>)
    
    return (
    <div className="votes">
          <PageNav title = {type}/>
           <CatList>
                {images}
           </CatList>
    </div>
    )
}

export default Votes;

function Cat({url}){
    return (
        <div className={`cat-list__item`}>
            <img src={url}/>
        </div>
    )
}