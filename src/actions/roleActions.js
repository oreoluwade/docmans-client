import axios from 'axios';
import { LOAD_ROLES_SUCCESS } from './actionTypes';

const { REACT_APP_API_URL } = process.env;

export function loadRolesSuccess(roles) {
    return {
        type: LOAD_ROLES_SUCCESS,
        payload: {
            roles
        }
    };
}

export function loadRoles() {
    return async dispatch => {
        axios.get(`${REACT_APP_API_URL}/role`).then(response => {
            dispatch(loadRolesSuccess(response.data));
        });
    };
}

export function saveRole(rolePayload) {
    return async dispatch => {
        axios.post(`${REACT_APP_API_URL}/role`, rolePayload).then(() => {
            dispatch(loadRoles());
        });
    };
}

export function updateRole(updateData) {
    return async dispatch => {
        axios
            .put(`${REACT_APP_API_URL}/role/${updateData.id}`, updateData)
            .then(() => {
                dispatch(loadRoles());
            });
    };
}

export function deleteRole(id) {
    return async dispatch => {
        axios.delete(`${REACT_APP_API_URL}/role/${id}`).then(() => {
            dispatch(loadRoles());
        });
    };
}
