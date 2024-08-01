import { useNavigate, useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { addData, updateData } from '../../redux/features/crud/roleSlice';
import { useDispatch, useSelector } from 'react-redux';
import { allPermissions } from "../../api/permissions";

const AddEditRole = () => {
  const [roleData, setRoleData] = useState({
    name: '',
    permmissions: []
  });
  const { id } = useParams();
  const { roles } = useSelector((state) => (state.role));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setRoleData({ ...roleData, [name]: value });
  };

  useEffect(() => {
    if (id) {
      const singleRole = roles.find((user) => user.id === id);
      setRoleData({ ...singleRole });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id) {
      await dispatch(addData({ name: roleData.name, permmissions: roleData.permmissions }));
    } else {
      await dispatch(updateData({ id: id, roleData: roleData }));
    }
    handleClear();
    navigate('/roles');
  };

  const handleClear = () => {
    setRoleData({ name: "", permmissions: [] });
  };

  const onCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const { permmissions } = roleData;

    if (checked) {
      setRoleData({ ...roleData, permmissions: [...permmissions, value] });
    }
    else {
      setRoleData({ ...roleData, permmissions: permmissions.filter((e) => e !== value) });
    }
  };

  const checkboxsElement = allPermissions.map((item, index) => {
    return (
      item !== 'all' && <div key={index} className="per">
        <input
          className="form-check-input"
          type="checkbox"
          value={item}
          checked={roleData.permmissions.some(p => p === item)}
          name="permmissions"
          id={`flexCheckDefault${index}`}
          onChange={onCheckboxChange}
        />
        <label
          className="lab"
          htmlFor={`flexCheckDefault${index}`}
        >{item}</label>
      </div>
    );
  })

  return (
    <div className='container'>
      <div className="create-form-box">
        <h3 className='stats__title'>{id ? "Edit Role Page" : "Create Role Page"}</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" name='name' placeholder='Role Name' className='role-name' value={roleData.name} onChange={onInputChange} />
          {checkboxsElement}
          <button>Save</button>
        </form>
        <Link className='go-back-btn' to="/roles">Go Back</Link>
      </div>
    </div>
  )
}

export default AddEditRole