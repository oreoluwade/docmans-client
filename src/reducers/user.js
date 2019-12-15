import { SET_CURRENT_USER, LOAD_USER_DOCUMENTS, RESET } from '../actions';
import initialState from './initialState';

export default (state = initialState.user, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        details: { ...state.details, ...action.payload.user }
      };

    case LOAD_USER_DOCUMENTS:
      return {
        ...state,
        documents: action.payload.documents
      };

    case RESET:
      return initialState.user;

    default:
      return state;
  }
};
