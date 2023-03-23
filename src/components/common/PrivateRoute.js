import { Navigate } from 'react-router-dom';

import { useAuthContext } from '../../contexts/AuthContext';

const PrivateRoute = ({ children }) => { //otiva vav App.js za ako e lognat
    const { isAuthenticated } = useAuthContext(); //vzimame samo isAuthenticated

    if (!isAuthenticated) {//ako ne e lognat
        return <Navigate to="/login" replace />
    }

    return children;//oako e OK pokaji childrena
};

export default PrivateRoute;
