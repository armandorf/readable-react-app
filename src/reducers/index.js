import { combineReducers } from 'redux';
import {
  RECEIVE_CATEGORIES,
} from '../actions/categories';
import {
  RECEIVE_POSTS,
  CREATE_POST,
  EDIT_POST,
  DELETE_POST,
} from '../actions/posts';
import {
  RECEIVE_COMMENTS,
  CREATE_COMMENT,
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
    case CREATE_POST:
      return {
        ...state,
        [action.item.category]: {
          ...state[action.item.category],
          'posts': {
            ...state[action.item.category]['posts'],
            [action.item.id]: {
              ...action.item,
              'comments': [],
            },
          },
        },
      };
    case EDIT_POST:
      return {
        ...state,
        [action.item.category]: {
          ...state[action.item.category],
          'posts': {
            ...state[action.item.category]['posts'],
            [action.item.id]: {
              ...state[action.item.category]['posts'][action.item.id],
              'title': action.item.title,
              'body': action.item.body,
              'voteScore': action.item.voteScore,
            },
          },
        },
      };
    case DELETE_POST:
      delete state[action.item.category].posts[action.item.id];
      return state;
    case RECEIVE_COMMENTS:
      return {
        ...state,
        [action.post.category]: {
          ...state[action.post.category],
          'posts': {
            ...state[action.post.category]['posts'],
            [action.post.id]: {
              ...state[action.post.category]['posts'][action.post.id],
              'comments': [...state[action.post.category]['posts'][action.post.id]['comments'], ...action.items],
            },
          },
        },
      };
    case CREATE_COMMENT:
      return {
        ...state,
        [action.post.category]: {
          ...state[action.post.category],
          'posts': {
            ...state[action.post.category]['posts'],
            [action.post.id]: {
              ...state[action.post.category]['posts'][action.post.id],
              'comments': [...state[action.post.category]['posts'][action.post.id]['comments'], action.item],
            },
          },
        },
      };
    case EDIT_COMMENT:
      return {
        ...state,
        [action.post.category]: {
          ...state[action.post.category],
          'posts': {
            ...state[action.post.category]['posts'],
            [action.post.id]: {
              ...state[action.post.category]['posts'][action.post.id],
              'comments': state[action.post.category]['posts'][action.post.id]['comments'].map(comment => comment.id === action.item.id ? action.item : comment),
            },
          },
        },
      };
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

export default combineReducers({
  postsByCategory,
  isFetching,
});
