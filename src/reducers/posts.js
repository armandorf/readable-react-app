import {
  REQUEST_POSTS,
  RECEIVE_POSTS,
} from '../actions/posts';

const initialState = {
  posts: [],
  isFetching: false,
};

export function posts(state = initialState, action) {

  switch (action.type) {
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case RECEIVE_POSTS:
      return {
        ...state,
        posts: action.posts,
        isFetching: action.isFetching,
      };
    default:
      return state;
  }
}

