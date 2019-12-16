import axios from 'axios';
import { RETRIEVE_USERS_SUCCESS, SET_CURRENT_USER } from './actionTypes';

const { REACT_APP_API_URL } = process.env;

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        payload: {
            user
        }
    };
}

export function retrieveUsersSuccess(users) {
    return {
        type: RETRIEVE_USERS_SUCCESS,
        payload: {
            users
        }
    };
}

export function retrieveUsers() {
    return async dispatch => {
        axios.get(`${REACT_APP_API_URL}/user`).then(response => {
            dispatch(retrieveUsersSuccess(response.data));
        });
    };
}

export function deleteUser(id) {
    return async dispatch => {
        axios.delete(`${REACT_APP_API_URL}/user/${id}`).then(() => {
            dispatch(retrieveUsers());
        });
    };
}

export function updateUserAdmin(user) {
    return async dispatch => {
        axios.put(`${REACT_APP_API_URL}/user/${user.id}`, user).then(() => {
            dispatch(retrieveUsers());
        });
    };
}

export const updateUserInfo = (userId, updatePayload) => async dispatch =>
    axios
        .put(`${REACT_APP_API_URL}/user/${userId}`, updatePayload)
        .then(response => {
            dispatch(setCurrentUser(response.data));
        });

export const getUserInfo = userId => async dispatch => {
    axios.get(`${REACT_APP_API_URL}/user/${userId}`).then(response => {
        dispatch(setCurrentUser(response.data));
    });
};
