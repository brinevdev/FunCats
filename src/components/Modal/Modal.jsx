import { useRef, useState } from 'react';
import './modal.scss';
import closeIcon from './../../resourses/img/close-icon.svg'
import { APIKEY } from '../../variables';


const Modal = ({active, setActive}) => {

    const myRef = useRef(null);
    const [drag,setDrag] = useState(false);
    const [img,setImage] = useState(null);
    const [imgPreview,setImgPreview] = useState(null);
    const [showMessage,setShowMessage] = useState(false)
    const [extensionError,setExtensionError] = useState(false);

    const showPreview = (file) => {
        const extension = file.name.slice(file.name.lastIndexOf('.') + 1)
        if (extension !== 'jpg' && extension !== 'png') {
            setExtensionError(true);
            setImage(null);
            setImgPreview(null);
        } else {
            setExtensionError(false);
            setImgPreview(URL.createObjectURL(file));
            setImage(file);
        }
    }

    const onDragStartHandler = (e) => {
        e.preventDefault();
        setDrag(true);
    }
    const onDragOver = (e) => {
        e.preventDefault();
    }
    const onDragLeaveHandler = (e) => {
        e.preventDefault();
        setDrag(false);
    }
    const onDropHandler = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        showPreview(file);
    }




    const onClickHandler = () => {
        myRef.current.click();
    }

    const onInputChange = (e) => {
        const file = e.target.files[0]
        showPreview(file);
    }


    const onUploadHandler = () => {
        const formData = new FormData()
        formData.append("file",img,"file");
        fetch(`https://api.thecatapi.com/v1/images/upload`,{
            method:"POST",
            headers: {
                "Content-Type": 'multipart/form-data',
                "x-api-key": APIKEY
            },
            body:formData,
        }).then(() => {
            setImage(null);
            URL.revokeObjectURL(imgPreview);
            setImgPreview(null);
            setShowMessage(true);
            setDrag(false);
        }).then(() => {
            setTimeout(() => {
                setShowMessage(false)
            },5000)
        })
        .catch(err => console.log(err));
    }

    return (
        <div className={active ? 'modal active' : '  modal'}>
            <div className= 'modal__body'>
                <div className="modal__header">
                    <div className="modal__title">Upload a .jpg or .png Cat Image</div>
                    <div className="modal__subtitle">Any uploads must comply with the <a href="https://thecatapi.com/privacy" className="modal__link">upload guidelines</a> or face deletion.</div>
                </div>
                <img src="" alt="" />
                <form style={{display:"none"}}>
                    <input type="file" ref={myRef} name="" id="" onChange={onInputChange}/>
                </form>
                <div 
                className="modal__drop drop"
                onDragEnter={onDragStartHandler}
                onDragOver= {onDragOver}
                onDragLeave={onDragLeaveHandler}
                onDrop = {onDropHandler}
                >
                    <div className={ extensionError ? "drop__area error" : "drop__area"} onClick = {onClickHandler}>
                       {imgPreview ? 
                            <div className="drop__preview">
                                    <img src={imgPreview} alt="" />
                            </div>
                         :
                            <div className="drop__text">
                                {drag ? 'Drop file here to upload' :'Drag here your file or Click here to upload'}
                            </div>
                        }
                    </div>
                    {extensionError || <div className="drop__file-name">{img ? img.name : 'no file selected'}</div>}
                    {img ?  <div className="upload" onClick = {onUploadHandler}> <button>UPLOAD PHOTO</button></div>  : null}
                </div>
                <button onClick = {() => setActive(false)} className="modal__close">
                    <img src = {closeIcon} alt="" />
                </button>
                {extensionError && <div className='error'>Only jpg or png extensions are possible</div>}
                {<div className={showMessage ? "modal__message active" : "modal__message"}>Thanks for the Uploading!</div> }
            </div>
        </div>
    )
}

export default Modal