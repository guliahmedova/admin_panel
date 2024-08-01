import { Link } from 'react-router-dom';
import profileImg from '../../assets/images/profile-02.png';
import '../TopNav/topNav.css';

const TopNav = () => {
  const role = JSON.parse(localStorage.getItem('role'));

  return (
    <div className="top__nav">
      <div className="top__nav-wrapper">
        <div className="search__box">
          <input type="text" placeholder='Search or Type' />
          <span><i className='ri-search-line'></i></span>
        </div>
        <div className="top__nav-right">
          <span className='notification'>
            <i className='ri-notification-3-line'></i>
            <span className='badge'>1</span>
          </span>
          <h6 className='role'>{role}</h6>
          <div className="profile">
            <Link to="/settings">
              <img src={profileImg} alt="" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopNav;