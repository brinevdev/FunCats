import { Link } from 'react-router-dom';
import './cat.scss';


const Cat = ({index, id, breedName, url}) => {
    return (
        <div className={`cat-list__item cat-list_${index+1}`}>
            <Link to = {`/breeds/${id}`} className="cat-list__name">{breedName}</Link>
            <Link to = {`/breeds/${id}`}><img src={url} alt={breedName}/></Link>
        </div>
    )
}

export default Cat