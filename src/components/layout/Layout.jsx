import './layout.scss';
import logo from './../../resourses/img/Logo.svg';
import voting from './../../resourses//img/voting_image.png';
import galery from './../../resourses/img/galery_image.png';
import breeds from './../../resourses/img/breeds_image.png';
import {ReactComponent as Like} from './../../resourses/img/like_smile.svg';
import {ReactComponent as Favorite} from './../../resourses/img/heart_smile.svg';
import {ReactComponent as Dislike} from './../../resourses/img/dislike_smile.svg';
import { Outlet, NavLink } from 'react-router-dom';
import Search from '../search/Search';


const Layout = () => {

    return (
        <div className="wrapper">
            <div className="container">
                <header className="header">
                    <a href="/" className="header__logo"><img src={logo} alt="logo" /></a>
                    <div className="navigation">
                        <Search/>
                        <nav className="top-menu">
                            <ul className="top-menu__items">
                                <li className="top-menu__item">
                                   <NavLink to="likes"><Like fill="#FF868E"/></NavLink> 
                                </li>
                                <li className="top-menu__item">
                                   <NavLink to="#"><Favorite fill='#FF868E'/></NavLink> 
                                </li>
                                <li className="top-menu__item">
                                   <NavLink to="dislikes"><Dislike fill="#FF868E"/></NavLink> 
                                </li>
                            </ul>
                        </nav>
                    </div>
                </header>
                <main className="main">
                    <div className="wrappper">
                        <div className="side-menu">
                            <div className="side-menu__title">Lets start using The Cat API</div>
                            <nav className="side-menu__items">
                                <div className="side-menu__item item-menu">
                                <NavLink to='/' className="item-menu__image"><img src={voting} alt="" /></NavLink>
                                    <NavLink to='/' className="item-menu__button">VOTING</NavLink>
                                </div>
                                <div className="side-menu__item item-menu">
                                    <NavLink to="breeds"  className="item-menu__image"><img src={breeds} alt="" /></NavLink>
                                    <NavLink to='breeds' className="item-menu__button ">BREEDS</NavLink>
                                </div>
                                <div className="side-menu__item item-menu">
                                <NavLink to="#"><img src={galery} alt="" /></NavLink>
                                    <NavLink to='#' className="item-menu__button ">GALLERY</NavLink>
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