import { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { addData, updateData } from '../../redux/features/crud/carSlice';
import { addCar, deleteCar } from '../../redux/features/crud/carCreateFormSlice';
import DatePicker from "react-datepicker";
import moment from 'moment';

const AddCar = () => {
  const { name, image, price, carCreatedDate } = useSelector((state) => ({ ...state.carCreateForm }));

  const [carData, setCarData] = useState({
    name: name ? name : "",
    image: "",
    createdAt: 0,
    price: price ? price : 0,
    updatedAt: 0,
    carCreatedDate: new Date()
  });

  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const moment = require('moment');
    let carCreatedDate = moment().format('L');
    await dispatch(addData({ name: carData.name, createdAt: carCreatedDate, price: carData.price, updatedAt: carCreatedDate, carCreatedDate: carData.carCreatedDate, image: carData.image.slice(12) }));
    handleClear();
    navigate('/cars');
  };

  const handleClear = () => {
    setCarData({ name: "", price: 0, image: "" });
    dispatch(deleteCar());
    setError(false);
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setCarData({ ...carData, [name]: value });
  };

  useEffect(() => {
    dispatch(addCar({ name: carData.name, image: carData.image.slice(12), price: carData.price, carCreatedDate: carData.carCreatedDate }));
  }, [carData]);

  return (
    <div className='container'>
      <div className="create-form-box">
        <h3 className='stats__title'>Create Car Page</h3>
        <form onSubmit={handleSubmit}>
          <input className="car-input" type="text" pattern="([A-z0-9À-ž\s]){2,}" name="name" value={carData.name} onChange={onInputChange} placeholder='Name' required />
          <input className="car-input" type="file" pattern="^[0-9]+$" name="image" value={carData.image} onChange={onInputChange} required />
          <input className="car-input" type="number" pattern="[0-9]" name="price" min='20' value={carData.price} onChange={onInputChange} placeholder='Price' required />
          <DatePicker
            closeOnScroll={true}
            isClearable
            required
            format="dd-mm-yyyy"
            name="carCreatedDate"
            value={carData.carCreatedDate}
            onChange={(date) => setCarData({ ...carData, carCreatedDate: date })}
            selected={carData.carCreatedDate}
          />
          <button type='submit'>Save</button>
        </form>
        <Link className='go-back-btn' to="/cars">Go Back</Link>
      </div>
    </div>
  )
}

export default AddCar;