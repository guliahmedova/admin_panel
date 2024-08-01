import { useEffect } from 'react';
import '../../styles/users.css';
import { getUsers, deleteData } from '../../redux/features/crud/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";

const UserList = () => {
  const dispatch = useDispatch();
  let no = 1;

  const { users } = useSelector((state) => ({ ...state.user }));
  const { loading } = useSelector((state) => ({ ...state.user }));

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this tour ?")) {
      dispatch(deleteData(id));
    }
  }

  const userPermissions = JSON.parse(localStorage.getItem('permmissions'));
  const role = JSON.parse(localStorage.getItem('role'));

  console.log(users);

  return (
    <div className='container'>
      <div className="user-list">
        {
          loading ?
            <ClipLoader
              color="white"
              loading={loading}
              size={50}
            />
            :
            <>
              <h3 className='title'>User List</h3>
              <Link to='/addUser' className='create-btn'>Create</Link>
              <table>
                <thead>
                  <tr>
                    <th>№</th>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users && users?.filter(u => u.role != "Super Admin").map((user, i) => (
                    <tr key={i}>
                      <td>{no++}</td>
                      <td>{user.username}</td>
                      <td>{user.password}</td>
                      <td>{user.role}</td>
                      {
                        <td>
                          <div className="actions">
                            <button className='delete-btn' onClick={() => handleDelete(user.id)}>Delete</button>
                            <Link className='edit-btn' to={`/editUser/${user.id}`}>Edit</Link>
                          </div>
                        </td>
                      }
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
        }
      </div>
    </div>
  )
}

export default UserList