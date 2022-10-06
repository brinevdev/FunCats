import './layout.scss';
import logo from './../../resourses/img/Logo.svg';
import voting from './../../resourses//img/voting_image.png';
import galery from './../../resourses/img/galery_image.png';
import breeds from './../../resourses/img/breeds_image.png';
import like from './../../resourses/img/like_smile.svg';
import favorite from './../../resourses/img/heart_smile.svg';
import dislike from './../../resourses/img/dislike_smile.svg';
import searchIcon from './../../resourses/img/search_icon.svg';
import { Outlet } from 'react-router-dom';

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
                                   <a href="#"><img src={like} alt="" /></a> 
                                </li>
                                <li className="top-menu__item">
                                   <a href="#"><img src={favorite} alt="" /></a> 
                                </li>
                                <li className="top-menu__item">
                                   <a href="#"><img src={dislike} alt="" /></a> 
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
                               <a href='/'><div className="item-menu__image"><img src={voting} alt="" /></div></a>
                                <button className="item-menu__button item-menu__button_active">VOTING</button>
                            </div>
                            <div className="side-menu__item item-menu">
                                <a href="/"><div className="item-menu__image"><img src={breeds} alt="" /></div></a>
                                <button className="item-menu__button ">BREEDS</button>
                            </div>
                            <div className="side-menu__item item-menu">
                               <a href="/"><div className="item-menu__image"><img src={galery} alt="" /></div></a>
                                <button className="item-menu__button ">GALLERY</button>
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