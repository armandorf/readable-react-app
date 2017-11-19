import { baseUrl, httpGetRequestOptions, headers } from '../utils/requestOptions';
import { requestingItems, receivedItems, } from './fetchingStatus';
import { fetchCommentsForPost } from './comments';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SELECT_POST = 'SELECT_POST';
export const ADD_ALL_POSTS = 'ADD_ALL_POSTS';
export const CREATE_POST = 'CREATE_POST';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  items: posts,
});

export const addAllPosts = items => ({
  type: ADD_ALL_POSTS,
  items: items,
});

export const fetchAllPosts = () => dispatch => {
  // signal that items are being fetched
  dispatch(requestingItems());

  return fetch(`${baseUrl}/posts`, httpGetRequestOptions)
    .then(
      response => response.json(),
      error => console.log('An error occurred while retrieving posts.', error),
    )
    .then(posts => {
      dispatch(receivePosts(posts));

      // signal async operation has ended
      dispatch(receivedItems());

      // fetch all comments for each post and attach them to the store
      posts.forEach(post => {
        dispatch(fetchCommentsForPost(post));
      });
    });
};

export const fetchPostsForCategory = category => dispatch => {
  // signal that items are being fetched
  dispatch(requestingItems());

  return fetch(`${baseUrl}/${category}/posts`, httpGetRequestOptions)
    .then(
      response => response.json(),
      error => console.log('An error occurred while retrieving posts for given category.', error),
    )
    .then(posts => {
      dispatch(receivePosts(posts));

      // signal async operation has ended
      dispatch(receivedItems());
    });
};

// post is the entire post object, not just the name!
// it will referenced in both the selectedPost property and in the main tree
export const selectPost = post => ({
  type: SELECT_POST,
  selectedPost: post,
});

export const requestPostCreate = post => dispatch => {
  // signal that request is being sent to server
  dispatch(requestingItems());

  const request = new Request(`${baseUrl}/posts`, {
    method: 'POST',
    headers: headers,
    cache: 'default',
    body: JSON.stringify(post),
  });
  return fetch(request)
    .then(
      response => response.json(),
      error => console.log('An error occurred while creating post.', error),
    )
    .then(post => {
      dispatch(createPost(post));

      // signal async operation has ended
      dispatch(receivedItems());
    });
};

/**
 * Attach newly created post to the store.
 */
export const createPost = post => ({
  type: CREATE_POST,
  item: post,
});

export const requestPostUpdate = post => dispatch => {
  // signal that request is being sent to server
  dispatch(requestingItems());

  // delete unnecessary fields (leave only title and body)
  delete post.timestamp;
  delete post.author;
  delete post.category;
  delete post.voteScore;
  delete post.comments;
  delete post.deleted;
  // build request object
  const request = new Request(`${baseUrl}/posts/${post.id}`, {
    method: 'PUT',
    headers: headers,
    cache: 'default',
    body: JSON.stringify(post),
  });
  return fetch(request)
    .then(
      response => response.json(),
      error => console.log('An error occurred while updating post.', error),
    )
    .then(post => {
      dispatch(editPost(post));

      // signal async operation has ended
      dispatch(receivedItems());
    });
};

/**
 * Edit post in the store.
 */
export const editPost = post => ({
  type: EDIT_POST,
  item: post,
});

export const requestPostVote = (post, value) => dispatch => {
  // signal that request is being sent to server
  dispatch(requestingItems());

  const request = new Request(`${baseUrl}/posts/${post.id}`, {
    method: 'POST',
    headers: headers,
    cache: 'default',
    body: JSON.stringify({ option: value }),
  });
  return fetch(request)
    .then(
      response => response.json(),
      error => console.log('An error occurred while voting the post.', error),
    )
    .then(post => {
      dispatch(editPost(post));

      // signal async operation has ended
      dispatch(receivedItems());
    });
};

export const requestPostDelete = post => dispatch => {
  // signal that request is being sent to server
  dispatch(requestingItems());

  const request = new Request(`${baseUrl}/posts/${post.id}`, {
    method: 'DELETE',
    headers: headers,
    cache: 'default',
  });
  return fetch(request)
    .then(
      response => response.json(),
      error => console.log('An error occurred while deleting the post.', error),
    )
    .then(post => {
      dispatch(deletePost(post));

      // signal async operation has ended
      dispatch(receivedItems());
    });
};

/**
 * Remove post from the store.
 */
export const deletePost = post => ({
  type: DELETE_POST,
  item: post,
});
