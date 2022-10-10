import './pageNav.scss';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import leftArrow from './../../resourses/img/left-arrow.svg';





const PageNav = ({title}) => {
    const navigate = useNavigate()
    return (
        <>
           <div className="page-nav">
            <button onClick = {() => navigate(-1)} className="back-button">
                    <img src={leftArrow} alt="" />
                </button>
                <div className="page-title">
                {title}
                </div>
           </div>
        </>
    )
}

export default PageNav;