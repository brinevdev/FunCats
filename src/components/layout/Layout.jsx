import { useRef, useState } from 'react';
import './layout.scss';
import logo from './../../resourses/img/Logo.svg';
import voting from './../../resourses//img/voting_image.png';
import galery from './../../resourses/img/galery_image.png';
import breeds from './../../resourses/img/breeds_image.png';
import {ReactComponent as Like} from './../../resourses/img/like_smile.svg';
import {ReactComponent as Favorite} from './../../resourses/img/heart_smile.svg';
import {ReactComponent as Dislike} from './../../resourses/img/dislike_smile.svg';
import { Outlet, Link, NavLink, useNavigate } from 'react-router-dom';
import Search from '../search/Search';



const Layout = () => {

    const [menuActive, setMenuActive] = useState(false);
    const navigate = useNavigate()

    const menuBody = useRef(null);
    const openMobileMenu = () => {
        setMenuActive((menuActive) => !menuActive);
    }

    const changePage = (address) => {
        navigate(address);
        setMenuActive((menuActive) => !menuActive);
    }
    
    return (
        <div className="wrapper">
            <div className="container">
                <header className="header">
                    <div className="header__menu menu menu_mobile"> 
                        <div className="header__row">
                        <div className={menuActive ? 'menu__icon _active' : 'menu__icon'} onClick={openMobileMenu}>
                            <span></span>
                        </div>
                        <nav className={menuActive ? 'menu__body _active' : 'menu__body'} ref = {menuBody}>
                            <ul className="menu__list">
                                <li className="menu__item"><button onClick={() => changePage('voting')} className="menu__link">Voting</button></li>
                                <li className="menu__item"><button onClick={() => changePage('breeds')} className="menu__link">Breeds</button></li>
                                <li className="menu__item"><button onClick={() => changePage('gallery')} className="menu__link">Gallery</button></li>
                            </ul>
                        </nav>
                        <nav className="top-menu">
                            <ul className="top-menu__items">
                                <li className="top-menu__item">
                                <NavLink to="likes"><Like fill="#FF868E"/></NavLink> 
                                </li>
                                <li className="top-menu__item">
                                <NavLink to="favorites"><Favorite fill='#FF868E'/></NavLink> 
                                </li>
                                <li className="top-menu__item">
                                <NavLink to="dislikes"><Dislike fill="#FF868E"/></NavLink> 
                                </li>
                            </ul>
                        </nav>
                        </div>
                        <div className="header__row">
                            <Search/>
                        </div>
                    </div>
                    <div className="header__menu menu menu_desktop">
                        <Link to="/" className="header__logo"><img src={logo} alt="logo" /></Link>
                        <div className="navigation">
                            <nav className="top-menu">
                                <ul className="top-menu__items">
                                    <li className="top-menu__item">
                                    <NavLink to="likes"><Like fill="#FF868E"/></NavLink> 
                                    </li>
                                    <li className="top-menu__item">
                                    <NavLink to="favorites"><Favorite fill='#FF868E'/></NavLink> 
                                    </li>
                                    <li className="top-menu__item">
                                    <NavLink to="dislikes"><Dislike fill="#FF868E"/></NavLink> 
                                    </li>
                                </ul>
                            </nav>
                            <Search/>
                        </div>
                    </div>
                </header>
                <main className="main">
                    <div className="wrappper-side-menu">
                        <div className="side-menu">
                            <div className="side-menu__title">Lets start using The Cat API</div>
                            <nav className="side-menu__items">
                                <div className="side-menu__item item-menu">
                                <NavLink to='voting' className="item-menu__image"><img src={voting} alt="" /></NavLink>
                                    <NavLink to='voting' className="item-menu__button">VOTING</NavLink>
                                </div>
                                <div className="side-menu__item item-menu">
                                    <NavLink to="breeds"  className="item-menu__image"><img src={breeds} alt="" /></NavLink>
                                    <NavLink to='breeds' className="item-menu__button ">BREEDS</NavLink>
                                </div>
                                <div className="side-menu__item item-menu">
                                <NavLink to="gallery"><img src={galery} alt="" /></NavLink>
                                    <NavLink to='gallery' className="item-menu__button ">GALLERY</NavLink>
                                </div>
                            </nav>
                        </div>
                    </div>
                    <div className="page">
                       <Outlet/>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Layout;