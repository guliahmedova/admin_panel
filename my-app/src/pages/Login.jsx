import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import { login } from '../redux/features/auth/authSlice';
import '../styles/login.css';

const Login = () => {
    const [userData, setUserData] = useState({
        username: '',
        password: ''
    });

    const [error, setError] = useState('');

    const { loading } = useSelector(state => state.auth);

    console.log(userData);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await dispatch(login(userData));

        navigate('/');
        console.log("home", res);

        setUserData({
            username: '',
            password: ''
        });
    };

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    return (
        <div className='container'>
            <div className="form-box">
                {
                    loading ?
                        <ClipLoader
                            color="white"
                            loading={loading}
                            size={50}
                        />
                        :
                        <>
                            <h3 className='stats__title'>Login Page</h3>
                            <form onSubmit={handleSubmit}>
                                <input type="text" name='username' value={userData.username} onChange={onInputChange} placeholder='Username' required />
                                <input type="text" name='password' value={userData.password} onChange={onInputChange} placeholder='Password' required />
                                <button type='submit'>Login</button>
                            </form>
                            {error && <p className='error'>{error}</p>}
                        </>
                }
            </div>
        </div>
    )
}

export default Login