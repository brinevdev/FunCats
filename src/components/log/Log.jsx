import './log.scss';
import {ReactComponent as Like} from './../../resourses/img/like_smile.svg';
import {ReactComponent as Favorite} from './../../resourses/img/heart_smile.svg';
import {ReactComponent as Dislike} from './../../resourses/img/dislike_smile.svg';

const Log = ({id,time,type,status,message}) => {

    if (status == 'Error') return (
        <div className="log">
            <div className="log__message message">
                <div className="message__time">{time}</div>
                <div className="message text">Error: {message}</div>
            </div>
        </div>
    )


    return (
        <div className="log">
            <div className="log__message message">
                <div className="message__time">{time}</div>
                <div className="message__text"> Image ID: <span>{id}</span> was added to {type}</div>
            </div>
            <div className="log__smile">
                {type == 'Dislikes' ?  <Dislike fill='#FF868E'/> : type == 'Favorites' ? <Favorite fill = '#FF868E'/> : <Like fill = "#97EAB9"/>}
            </div>
        </div>
    )
}

export default Log