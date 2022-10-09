import { Link } from 'react-router-dom';
import './cat.scss';


const Cat = ({index, breedId, breedName, url}) => {
    return (
        <div className={`cat-list__item cat-list_${index+1}`}>
            <Link to = {`/breeds/${breedId}`} className="cat-list__name">{breedName}</Link>
            <Link to = {`/breeds/${breedId}`}><img src={url} alt={breedName}/></Link>
        </div>
    )
}

export default Cat