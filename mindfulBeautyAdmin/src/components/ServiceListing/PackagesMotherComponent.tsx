import { Outlet, useLocation } from 'react-router-dom';

export const PackagesMotherComponent = () => {
    const location = useLocation();

    console.log('Current Path:', location.pathname);
    return (
        <div>
            <Outlet />
        </div>
    )
}
