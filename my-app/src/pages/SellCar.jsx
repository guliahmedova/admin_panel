import { useEffect } from "react";
import CarCard from "../components/CarCard"
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { getCars } from '../redux/features/crud/carSlice';

const SellCar = () => {
  const { cars } = useSelector((state) => ({ ...state.car }));
  const { loading } = useSelector((state) => ({ ...state.car }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCars());
  }, [dispatch])

  const carCards = cars.map((car, index) => {
    return <CarCard key={index} {...car} />
  });

  return (
    <div className='container'>
      <div className="sellCar">
        {
          loading ? <ClipLoader
            color="white"
            loading={loading}
            size={50}
          /> : carCards
        }
      </div>
    </div>
  )
}

export default SellCar