import './layout.scss';
import logo from './../../resourses/img/Logo.svg';
import voting from './../../resourses//img/voting_image.png';
import galery from './../../resourses/img/galery_image.png';
import breeds from './../../resourses/img/breeds_image.png';
import like from './../../resourses/img/like_smile.svg';
import favorite from './../../resourses/img/heart_smile.svg';
import dislike from './../../resourses/img/dislike_smile.svg';
import searchIcon from './../../resourses/img/search_icon.svg';
import { Outlet, NavLink } from 'react-router-dom';

const Layout = () => {

    return (
        <div className="wrapper">
            <div className="container">
                <header className="header">
                    <a href="/" className="header__logo"><img src={logo} alt="logo" /></a>
                    <div className="navigation">
                        <form action="">
                            <input type="text" className="navigation__search" placeholder='Search for breeds by name'/>
                            <button><img src={searchIcon} alt="" /></button>
                        </form>
                        <nav className="top-menu">
                            <ul className="top-menu__items">
                                <li className="top-menu__item">
                                   <NavLink to="#"><img src={like} alt="" /></NavLink> 
                                </li>
                                <li className="top-menu__item">
                                   <NavLink to="#"><img src={favorite} alt="" /></NavLink> 
                                </li>
                                <li className="top-menu__item">
                                   <NavLink to="#"><img src={dislike} alt="" /></NavLink> 
                                </li>
                            </ul>
                        </nav>
                    </div>
                </header>
                <main className="main">
                    <div className="side-menu">
                    <div className="side-menu__title">Lets start using The Cat API</div>
                        <nav className="side-menu__items">
                            <div className="side-menu__item item-menu">
                               <NavLink to='/'><div className="item-menu__image"><img src={voting} alt="" /></div></NavLink>
                                <NavLink to='/' className="item-menu__button">VOTING</NavLink>
                            </div>
                            <div className="side-menu__item item-menu">
                                <NavLink to="breeds"><div className="item-menu__image"><img src={breeds} alt="" /></div></NavLink>
                                <NavLink to='breeds' className="item-menu__button ">BREEDS</NavLink>
                            </div>
                            <div className="side-menu__item item-menu">
                               <NavLink to="#"><div className="item-menu__image"><img src={galery} alt="" /></div></NavLink>
                                <NavLink to='#' className="item-menu__button ">GALLERY</NavLink>
                            </div>
                        </nav>
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