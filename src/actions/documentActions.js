import axios from 'axios';
import { LOAD_ALL_DOCUMENTS, LOAD_USER_DOCUMENTS } from './actionTypes';

const { REACT_APP_API_URL } = process.env;

export function retrieveAllDocuments(documents) {
    return {
        type: LOAD_ALL_DOCUMENTS,
        payload: {
            documents
        }
    };
}

export function retrieveUserDocuments(documents) {
    return {
        type: LOAD_USER_DOCUMENTS,
        payload: {
            documents
        }
    };
}

export function loadUserDocuments(id) {
    return async dispatch => {
        axios.get(`${REACT_APP_API_URL}/user/${id}/document`).then(response => {
            dispatch(retrieveUserDocuments(response.data));
        });
    };
}

export function loadAllDocuments() {
    return async dispatch => {
        axios.get(`${REACT_APP_API_URL}/document`).then(response => {
            dispatch(retrieveAllDocuments(response.data));
        });
    };
}

export const saveDocument = (document, userId) => {
    return async dispatch => {
        axios.post(`${REACT_APP_API_URL}/document`, document).then(() => {
            dispatch(loadUserDocuments(userId));
            dispatch(loadAllDocuments());
        });
    };
};

export const updateDocument = (document, userId) => {
    return async dispatch => {
        axios
            .put(`${REACT_APP_API_URL}/document/${document.id}`, document)
            .then(() => {
                dispatch(loadUserDocuments(userId));
            });
    };
};

export function deleteDocument(id, userId) {
    return async dispatch => {
        axios.delete(`${REACT_APP_API_URL}/document/${id}`).then(() => {
            dispatch(loadUserDocuments(userId));
        });
    };
}

export function searchForAllDocuments(query) {
    return async dispatch => {
        axios
            .get(`${REACT_APP_API_URL}/search?query=${query}`)
            .then(response => {
                dispatch(retrieveAllDocuments(response.data));
            });
    };
}
