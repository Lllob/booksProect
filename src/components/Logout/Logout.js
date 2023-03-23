import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';
import * as authService from '../../services/authService';

const Logout = () => {
    const navigate = useNavigate();
    const { user, userLogout } = useContext(AuthContext);

    useEffect(() => {
        authService.logout(user.accessToken)//davame dannite na logout(authServis.js i iztriva usera ot sarvara)
            .then(() => {
                userLogout();//iztrivame i vav konteksta(ot AuthContext.js)
              navigate('/');
            })
            .catch(() => {
                navigate('/404');
            });
    });

    return null;
}

export default Logout;
