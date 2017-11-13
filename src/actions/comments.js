import { options, baseUrl } from '../utils/requestOptions';

export const REQUEST_COMMENTS = 'REQUEST_COMMENTS';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const REQUEST_COMMENTS_FOR_POST = 'REQUEST_COMMENTS_FOR_POST';
export const SELECT_COMMENT = 'SELECT_COMMENT';
export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';

export const selectComment = comment => ({
  type: SELECT_COMMENT,
  selectedComment: comment,
});
