import { Outlet, useLocation } from 'react-router-dom';

export const ServicesMotherComponent = () => {
    const location = useLocation();

    console.log('Current Path:', location.pathname);
    return (
        <div>
            <Outlet />
        </div>
    )
}
