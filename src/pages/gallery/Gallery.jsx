import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeGalleryBreed, changeGalleryImageType, changeGalleryLimit, getGallery } from './gallerySlice';
import CatList from '../../components/catList/CatList';
import PageNav from '../../components/pageNav/pageNav';
import './gallery.scss';
import updateIcon from './../../resourses/img/update_icon.svg';
import heartIcon from './../../resourses/img/heart-icon.svg';
import { addToFavorite } from '../voting/votingSlice';
import Modal from '../../components/Modal/Modal';



const Gallery = () => {

    const { breeds } = useSelector(state => state.cats);
    const {gallery = [], galleryFilters = []} = useSelector(state => state.gallery);
    const [modalActive,setModalActive] = useState(false)
    const dispatch = useDispatch()

    let breedsOptions = breeds.map((breed) => {
        return <option key = {breed.id} value = {breed.id}>{breed.name}</option>
    })

    

    return (
        <div className="gallery">
            <div className="gallery__top-menu">
                <PageNav title = 'gallery'/>
                <div className="gallery__buttons">
                    <button className="gallery__upload" onClick = {() => setModalActive(true)}>
                        Upload
                    </button>
                    <button className="gallery__update" onClick = {() => dispatch(getGallery(galleryFilters))}>
                        <img src={updateIcon} alt="" />
                    </button>
                </div>
            </div>
            <div className="gallery__menu menu-gallery">
                <div className="menu-gallery__item">
                    <div className="menu-gallery__title">Breed</div>
                    <select className="menu-gallery__select" onChange = {(e) => {
                        dispatch(changeGalleryBreed(e.target.value))
                        }}>
                        <option value = {''}>All breeds</option>
                        {breedsOptions}
                    </select>
                </div>
                <div className="menu-gallery__item">
                <div className="menu-gallery__title">Limit</div>
                    <select className="menu-gallery__select" onChange={(e) => dispatch(changeGalleryLimit(e.target.value))}>
                        <option value='5'>Limit: 5</option>
                        <option value='10'>Limit: 10</option>
                        <option value='15'>Limit: 15</option>
                        <option value='20'>Limit: 20</option>
                    </select>
                </div>
                <div className="menu-gallery__item">
                    <div className="menu-gallery__title">Type</div>
                    <select className="menu-gallery__select" onChange={(e) => dispatch(changeGalleryImageType(e.target.value))}>
                        <option value="">All</option>
                        <option value="gif">Animated</option>
                        <option value="jpg,png">Static</option>
                    </select>
                </div>
            </div>
            <CatList>
                {gallery.map((cat) => <Cat {...cat} key = {cat.id} />)}
            </CatList>
            <Modal active = {modalActive} setActive = {setModalActive}/>
        </div>
    )
}

export default Gallery


function Cat({id,url}){

    const dispatch = useDispatch()
    return (
        <div className={`cat-list__item`}>
            <div onClick = {() => dispatch(addToFavorite(id))}className="heart-icon">
                <img className='heart-icon__image' src={heartIcon} alt="" />
            </div>
           <img src={url}/>
        </div>
    )
}