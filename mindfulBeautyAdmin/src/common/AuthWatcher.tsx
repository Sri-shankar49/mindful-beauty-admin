import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/loginSlice';

const AuthWatcher = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const checkLoginProviderID = () => {
            const providerID = sessionStorage.getItem('loginProviderID');
            if (!providerID) {
                dispatch(logout()); // Automatically log out if loginProviderID is null
            }
        };

        // Run on mount
        checkLoginProviderID();

        // Listen for sessionStorage changes
        const storageListener = () => {
            checkLoginProviderID();
        };

        window.addEventListener('storage', storageListener);
        return () => {
            window.removeEventListener('storage', storageListener);
        };
    }, [dispatch]);

    return null;
};

export default AuthWatcher;
