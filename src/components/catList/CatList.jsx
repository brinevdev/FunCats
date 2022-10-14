import { Fragment,} from 'react';
import './catList.scss';
import Cat from '../cat/Cat';
import Spinner from '../spinner/Spinner';
import errorImage from './../../resourses/img/error.png'

const CatList = ({cats = [], status}) => {
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
    if (catsItems.length == 0) return <div className='not-found'>No item found</div>
    return (
        <Fragment>
            <div className="cat-list">
                {catsItems}
            </div> 
        </Fragment>
        
        
    )
}

export default CatList;