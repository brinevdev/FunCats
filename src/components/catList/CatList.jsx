import './catList.scss';
import img1 from './../../resourses/img/cats/cat_1.png'
import img2 from './../../resourses/img/cats/cat_2.png'
import img3 from './../../resourses/img/cats/cat_3.png'
import img4 from './../../resourses/img/cats/cat_4.png'
import img5 from './../../resourses/img/cats/cat_5.png'
import { Fragment } from 'react';


const CatList = () => {
    return (
        <Fragment>
            <div className="cat-list">
                <div className="cat-list__item cat-list_1">
                    <div className="cat-list__name">Abyssinian</div>
                    <img src={img1} alt=""/>
                </div>
                <div className="cat-list__item cat-list_2">
                    <div className="cat-list__name">Abyssinian</div>
                    <img src={img2} alt=""/>
                </div>
                <div className="cat-list__item cat-list_3">
                    <div className="cat-list__name">Abyssinian</div>
                    <img src={img3} alt=""/>
                </div>
                <div className="cat-list__item cat-list_4"> 
                    <div className="cat-list__name">Abyssinian</div>
                    <img src={img4} alt=""/>
                </div>
                <div className="cat-list__item cat-list_5">
                    <div className="cat-list__name">Abyssinian</div>
                    <img src={img5} alt=""/>
                </div>
            </div> 
        </Fragment>
        
        
    )
}

export default CatList;