import './singleBreed.scss';
import 'swiper/css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PageNav from '../../components/pageNav/pageNav';
import { useEffect } from 'react';
import { getBreed } from '../../components/catsSlice/catsSlice';
import { Swiper, SwiperSlide } from 'swiper/react';
import Spinner from '../../components/spinner/Spinner';
import errorImage from './../../resourses/img/error.png'



const SingleBreed = () => {
    const dispatch = useDispatch();
    const { id } = useParams()
    const { breed, breedLoadingStatus } = useSelector(state => state.cats);
    const {name, temperament, origin, weight, lifeSpan, image} = breed; 
   
    
    


    useEffect(() => {
        dispatch(getBreed(id))
    },[]);

    if (breedLoadingStatus == 'loading') return <Spinner/>
    if (breedLoadingStatus == 'error') return <div><img style={{width:'100%',padding:'20px'}} src={errorImage} alt="error" /></div>
    return (
       <div className="breed">
         <PageNav title = 'breed'/>
            <div className="breed__image">
                <img src={image} alt="" />
            </div>
            <div className="breed__description">
                <div className="breed__name">
                    {name}
                </div>
                <div className="breed__temperament">
                <span className="bold">Temperament:</span> <br/>
                    {temperament}
                </div>
                <div className="breed__info">
                    <div><span className="bold">Origin:</span> {origin} </div>
                    <div><span className="bold">Weight:</span> {weight} </div>
                    <div><span className="bold">Life span:</span> {lifeSpan} </div>
                </div>
            </div>
       </div>
    ) 
    
}

export default SingleBreed;