import { baseUrl, httpGetRequestOptions, headers } from '../utils/requestOptions';
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

  return fetch(`${baseUrl}/posts/${post.id}/comments`, httpGetRequestOptions)
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
  post: post, // a full post to easily access store's properties
});

export const selectComment = comment => ({
  type: SELECT_COMMENT,
  selectedComment: comment,
});

export const requestCommentVote = (post, comment, value) => dispatch => {
  // indicate that request is being sent to server
  dispatch(requestingItems());

  const request = new Request(`${baseUrl}/comments/${comment.id}`, {
    method: 'POST',
    headers: headers,
    cache: 'default',
    body: JSON.stringify({ option: value }),
  });
  return fetch(request)
    .then(
      response => response.json(),
      error => console.log('An error occurred while voting the comment.', error),
    )
    .then(comment => {
      dispatch(editComment(post, comment));

      // signal async operation has ended
      dispatch(receivedItems());
    });
};

/**
 * Edit comment in the store.
 */
export const editComment = (post, comment) => ({
  type: EDIT_COMMENT,
  post: post,
  item: comment,
});
