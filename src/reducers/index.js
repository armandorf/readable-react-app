import { combineReducers } from 'redux';
import {
  REQUEST_CATEGORIES,
  RECEIVE_CATEGORIES,
  SELECT_CATEGORY,
} from '../actions/categories';
import {
  REQUEST_POSTS,
  RECEIVE_POSTS,
  ADD_ALL_POSTS,
  SELECT_POST,
  addAllPosts,
} from '../actions/posts';
import {
  SELECT_COMMENT,
} from '../actions/comments';
import {
  ASYNC_OPERATION_STARTED,
  ASYNC_OPERATION_FINISHED,
} from '../actions/fetchingStatus';

export const postsByCategory = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      return {
        ...state,
        ...action.items.reduce((categories, category) => {
          category['posts'] = {};
          return {
            ...categories,
            [category.name]: category,
          };
        }, {}),
      };
    case RECEIVE_POSTS:
      action.items.forEach(post => {
        post['comments'] = {};
        state[post.category].posts[post.id] = post;
      });
      return state;
    default:
      return state;
  }
};

export const isFetching = (state = false, action) => {
  switch (action.type) {
    case ASYNC_OPERATION_STARTED:
      return action.isFetching;
    case ASYNC_OPERATION_FINISHED:
      return action.isFetching;
    default:
      return state;
  }
};

export const selectCategory = (state = {}, action) => {
  switch (action.type) {
    case SELECT_CATEGORY:
      return {
        selectedCategory: action.category,
      };
    default:
      return state;
  }
};

export const selectPost = (state = {}, action) => {
  switch (action.type) {
    case SELECT_POST:
      return {
        selectedPost: action.post,
      };
    default:
      return state;
  }
};

export const selectComment = (state = {}, action) => {
  switch (action.type) {
    case SELECT_COMMENT:
      return {
        selectedComment: action.comment,
      };
    default:
      return state;
  }
};

export default combineReducers({
  postsByCategory,
  selectCategory,
  selectPost,
  selectComment,
  isFetching,
});
