import { baseUrl, httpGetRequestOptions, headers } from '../utils/requestOptions';
import { requestingItems, receivedItems, } from './fetchingStatus';

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const REQUEST_POSTS_FOR_CATEGORY = 'REQUEST_POSTS_FOR_CATEGORY';
export const SELECT_POST = 'SELECT_POST';
export const ADD_ALL_POSTS = 'ADD_ALL_POSTS';
export const CREATE_POST = 'CREATE_POST';
export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const UPVOTE_POST = 'UPVOTE_POST';
export const DOWNVOTE_POST = 'DOWNVOTE_POST';
export const REMOVE_POST = 'REMOVE_POST';

export const receivePosts = (posts, category) => ({
  type: RECEIVE_POSTS,
  items: posts,
});

export const addAllPosts = items => ({
  type: ADD_ALL_POSTS,
  items: items,
});

export const fetchAllPosts = () => dispatch => {
  // indicate that items are being fetched
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
    });
};

// TODO: implement this action
export const fetchPostsForCategory = category => dispatch => {
  // indicate that items are being fetched
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

/**
 * NECESSARY DATA TO CREATE A POST
 *   - type: CREATE_POST,
 *   - id: post.id,
 *   - timestamp: post.timestamp,
 *   - title: post.title,
 *   - body: post.body,
 *   - author: post.author,
 *   - category: post.category,
 */
export const createPost = post => dispatch => {
  // indicate that request is being sent to server
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
    dispatch(addPost(post));

    // signal async operation has ended
    dispatch(receivedItems());
  });
};

/**
 * Attach newly created post to the store.
 */
// TODO: implement the reducer for this action!!!
export const addPost = post => ({
  type: ADD_POST,
  item: post,
});

