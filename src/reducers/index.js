import { combineReducers } from 'redux';
import {
  REQUEST_CATEGORIES,
  RECEIVE_CATEGORIES,
  SELECT_CATEGORY,
} from '../actions/categories';
import {
  REQUEST_POSTS,
  RECEIVE_POSTS,
  SELECT_POST,
  CREATE_POST,
  EDIT_POST,
  DELETE_POST,
} from '../actions/posts';
import {
  SELECT_COMMENT,
  RECEIVE_COMMENTS,
  EDIT_COMMENT,
  DELETE_COMMENT,
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
        post['comments'] = [];
        state[post.category].posts[post.id] = post;
      });
      return state;
    case EDIT_POST:
      state[action.item.category].posts[action.item.id].title = action.item.title;
      state[action.item.category].posts[action.item.id].body = action.item.body;
      state[action.item.category].posts[action.item.id].voteScore = action.item.voteScore;
      return state;
    case CREATE_POST:
      state[action.item.category].posts[action.item.id] = action.item;
      state[action.item.category].posts[action.item.id]["comments"] = [];
      return state;
    case RECEIVE_COMMENTS:
      action.items.forEach(comment => {
        state[action.post.category].posts[action.post.id].comments.push(comment);
      });
      return state;
    case EDIT_COMMENT:
      const comment = state[action.post.category].posts[action.post.id].comments.find(comment => action.item.id === comment.id);
      if (comment) {
        comment.voteScore = action.item.voteScore;
        comment.body = action.item.body;
        comment.timestamp = action.item.timestamp;
      }
      return state;
    case DELETE_POST:
      delete state[action.item.category].posts[action.item.id];
      return state;
    case DELETE_COMMENT:
      return {
        ...state,
        [action.post.category]: {
          ...state[action.post.category],
          'posts': {
            ...state[action.post.category]['posts'],
            [action.post.id]: {
              ...state[action.post.category]['posts'][action.post.id],
              'comments': state[action.post.category]['posts'][action.post.id]['comments'].filter(comment => comment.id !== action.item.id),
            },
          },
        },
      };
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
