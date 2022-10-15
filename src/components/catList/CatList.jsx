import './catList.scss';
import Spinner from '../spinner/Spinner';
import errorImage from './../../resourses/img/error.png'

const CatList = ({status, children}) => {
  
    if (status == 'loading') return <Spinner/>
    if (status == 'error') return <div><img style={{width:'100%',padding:'20px'}} src={errorImage} alt="error" /></div>
    if (!children) return <div className='not-found'>No item found</div>

    return (
        <div className="cat-list">
            {children}
        </div>         
    )
}

export default CatList;