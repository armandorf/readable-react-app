import { baseUrl, httpGetRequestOptions, headers } from '../utils/requestOptions';
import { requestingItems, receivedItems, } from './fetchingStatus';

export const REQUEST_COMMENTS = 'REQUEST_COMMENTS';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const REQUEST_COMMENTS_FOR_POST = 'REQUEST_COMMENTS_FOR_POST';
export const SELECT_COMMENT = 'SELECT_COMMENT';
export const CREATE_COMMENT = 'CREATE_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

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

export const requestCreateComment = (post, comment) => dispatch => {
  // indicate that request is being sent to server
  dispatch(requestingItems());

  const request = new Request(`${baseUrl}/comments`, {
    method: 'POST',
    headers: headers,
    cache: 'default',
    body: JSON.stringify(comment),
  });
  return fetch(request)
    .then(
      response => response.json(),
      error => console.log('An error occurred creating the comment.', error),
    )
    .then(comment => {
      dispatch(addComment(post, comment));

      // signal async operation has ended
      dispatch(receivedItems());
    });
};

/**
 * Add comment to the store.
 */
export const addComment = (post, comment) => ({
  type: CREATE_COMMENT,
  post: post,
  item: comment,
});

/**
 * Edit comment in the store.
 */
export const editComment = (post, comment) => ({
  type: EDIT_COMMENT,
  post: post,
  item: comment,
});

export const requestCommentDelete = (post, comment) => dispatch => {
  // signal that request is being sent to server
  dispatch(requestingItems());

  const request = new Request(`${baseUrl}/comments/${comment.id}`, {
    method: 'DELETE',
    headers: headers,
    cache: 'default',
  });
  return fetch(request)
    .then(
      response => response.json(),
      error => console.log('An error occurred while deleting the comment.', error),
    )
    .then(comment => {
      dispatch(deleteComment(post, comment));

      // signal async operation has ended
      dispatch(receivedItems());
    });
};

/**
 * Remove comment from the store.
 */
export const deleteComment = (post, comment) => ({
  type: DELETE_COMMENT,
  post: post,
  item: comment,
});
