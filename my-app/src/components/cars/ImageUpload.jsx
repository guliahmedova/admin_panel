import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const ImageUpload = ({value, onUpdate}) => {

    const [image, setImage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        onUpdate(image.split("\\")[2])
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" value={image} onChange={(e) => setImage(e.target.value)} />
                <button>Edit</button>
            </form>
        </div>
    )
}

export default ImageUpload