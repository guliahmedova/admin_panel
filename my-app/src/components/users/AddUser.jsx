import { useState, useEffect } from 'react';
import { addData, updateData } from '../../redux/features/crud/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getRoles } from '../../redux/features/crud/roleSlice';

const AddUser = () => {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    role: 'User',
  });

  const { users } = useSelector((state) => (state.user));
  const { roles } = useSelector((state) => (state.role));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const singleUser = users.find((user) => user.id === id);
      setUserData({ ...singleUser });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    const token = Math.random().toString(36).substr(2);
    e.preventDefault();
    if (!id) {
      await dispatch(addData({ username: userData.username, password: userData.password, role: userData.role, accessToken: token }));
    } else {
      await dispatch(updateData({ id: id, userData: userData }));
    }
    handleClear();
    navigate('/users');
  };

  const handleClear = () => {
    setUserData({ username: "", password: "", role: "User" });
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  useEffect(() => {
    dispatch(getRoles());
  }, [dispatch]);

  return (
    <div className='container'> 
      <div className="create-form-box">
        <h3 className='stats__title'>{id ? "Edit User Page" : "Create User Page"}</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" name='username' value={userData.username} onChange={onInputChange} placeholder='Username' required />
          <input type="text" name='password' value={userData.password} onChange={onInputChange} placeholder='Password' required />
          <select className='roles' name="role" value={userData.role} onChange={onInputChange}>
            {roles &&
              roles.map((item, index) => (
                <option key={index}>{item.name}</option>
              ))
            }
          </select>
          <button type='submit'>Save</button>
        </form>
        <Link className='go-back-btn' to="/users">Go Back</Link>
      </div>
    </div>
  );
};

export default AddUser;