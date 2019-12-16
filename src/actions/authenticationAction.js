import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import { SET_CURRENT_USER, RESET } from './actionTypes';
import { loadUserDocuments } from './documentActions';

const { REACT_APP_API_URL } = process.env;

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        payload: {
            user
        }
    };
}

export function logout() {
    return dispatch => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('user');
        setAuthorizationToken(false);
        dispatch({ type: RESET });
    };
}

export function login(data) {
    return async dispatch => {
        const response = await axios.post(
            `${REACT_APP_API_URL}/user/login`,
            data
        );
        const {
            token,
            username,
            email,
            firstname,
            lastname,
            roleId,
            id
        } = response.data;
        const user = { username, email, firstname, lastname, roleId, id };
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('jwtToken', token);
        setAuthorizationToken(token);
        dispatch(setCurrentUser(user));
        dispatch(loadUserDocuments(id));
    };
}
