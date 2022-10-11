import { Fragment,} from 'react';
import {useSelector} from 'react-redux';
import './catList.scss';
import Cat from '../cat/Cat';
import Spinner from '../spinner/Spinner';
import errorImage from './../../resourses/img/error.png'

const CatList = () => {
    const {cats,status} = useSelector(state => state.cats);
    const catsItems = cats.map((cat,index) => {
        return (
                <Cat
                id = {cat.id} 
                key = {cat.id} 
                index = {index} 
                breedId = {cat.breedId} 
                url = {cat.url} 
                breedName = {cat.breedName}/>
        )
    });

    if (status == 'loading') return <Spinner/>
    if (status == 'error') return <div><img style={{width:'100%',padding:'20px'}} src={errorImage} alt="error" /></div>
    return (
        <Fragment>
            <div className="cat-list">
                {catsItems}
            </div> 
        </Fragment>
        
        
    )
}

export default CatList;