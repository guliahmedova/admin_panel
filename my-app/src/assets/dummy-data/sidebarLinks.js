import { MdDashboard, MdOutlineNoiseControlOff } from 'react-icons/md';
import {FiUsers} from 'react-icons/fi';
import {TbBrandBooking} from 'react-icons/tb';
import {AiOutlineCar, AiFillSetting, AiFillCar} from 'react-icons/ai';

const sidebarLinks = [
    { path: '/', name: "Dashboard", icon: <MdDashboard />, permissions: "all" },
    { path: '/roles', name: "Roles", icon: <MdOutlineNoiseControlOff />, permissions: "roles" },
    { path: '/users', name: "Users", icon: <FiUsers />, permissions: "users" },
    { path: '/sell-car', name: "Sell-Car", icon: <AiOutlineCar />, permissions: "sell-car" },
    { path: '/bookings', name: "Bookings", icon: <TbBrandBooking />, permissions: "bookings" },
    { path: '/settings', name: "Settings", icon: <AiFillSetting />, permissions: "settings" },
    { path: '/cars', name: "Cars", icon: <AiFillCar />, permissions: "cars" },
]

export default sidebarLinks;