import { baseUrl, httpGetRequestOptions } from '../utils/requestOptions';
import { requestingItems, receivedItems, } from './fetchingStatus';

export const REQUEST_COMMENTS = 'REQUEST_COMMENTS';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const REQUEST_COMMENTS_FOR_POST = 'REQUEST_COMMENTS_FOR_POST';
export const SELECT_COMMENT = 'SELECT_COMMENT';
export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';

export const fetchCommentsForPost = post => dispatch => {
  // indicate that items are being fetched
  dispatch(requestingItems());

  return fetch(`${baseUrl}/${post.id}/comments`, httpGetRequestOptions)
    .then(
      response => response.json(),
      error => console.log('An error occurred while retrieving comments for given post.', error),
    )
    .then(comments => {
      dispatch(receiveComments(comments, post));

      // signal async operation has ended
      dispatch(receivedItems());
    });
};

export const receiveComments = (comments, post) => ({
  type: RECEIVE_COMMENTS,
  items: comments,
  post: post, // a full post to easily access store
});

export const selectComment = comment => ({
  type: SELECT_COMMENT,
  selectedComment: comment,
});
