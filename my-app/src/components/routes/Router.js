import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from 'react-router-dom';
import { getRoles } from "../../redux/features/crud/roleSlice";
import routes from '../../routesList';

const Router = () => {
    const dispatch = useDispatch();
    const role = JSON.parse(localStorage.getItem('role'));
    const { roles } = useSelector((state) => (state.role));
    const getPermmissions = roles.find((item) => item.name.toLowerCase() === role.toLowerCase());

    useEffect(() => {
        dispatch(getRoles());
    }, [dispatch])

    return (
        <Routes>
            {routes.map((route, index) => {
                if (getPermmissions?.permmissions?.includes(route?.permissions) || route?.permissions === "all") {
                    return <Route key={index} exact={route?.exact} path={route?.path} element={route?.element}
                    />
                }
            })}
        </Routes>
    )
}

export default Router;
