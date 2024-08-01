import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRoles, deleteData } from '../../redux/features/crud/roleSlice';
import { Link } from 'react-router-dom';

const RoleList = () => {
  const { roles } = useSelector((state) => ({ ...state.role }));
  const dispatch = useDispatch();
  let no = 1;

  useEffect(() => {
    dispatch(getRoles());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this tour ?")) {
      dispatch(deleteData(id));
    }
  }

  return (
    <div className='container'>
      <div className="role-list">
        <h3 className='title'>Role List</h3>
        <Link to='/addRole' className='create-btn'>Create</Link>
        <table>
          <thead>
            <tr>
              <th>№</th>
              <th>Name</th>
              <th>Permissions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles && roles.map((role, index) => (
              <tr key={index}>
                <td>{no++}</td>
                <td>{role.name}</td>
                <td>{role.permmissions?.join(', ')}</td>
                <td className='actions-btn'>
                  <Link className='edit-btn' to={`/editRole/${role.id}`}>Edit</Link>
                  <button className='delete-btn' onClick={() => handleDelete(role.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RoleList;