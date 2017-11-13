import {
  REQUEST_CATEGORIES,
  RECEIVE_CATEGORIES,
} from '../actions/categories';

export function categories(state = {}, action) {
  switch (action.type) {
    case REQUEST_CATEGORIES:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case RECEIVE_CATEGORIES:
      return {
        ...state,
        postsByCategory: action.items.reduce((categories, category) => ({
            ...categories,
            [category.name]: category,
          }), {}),
        isFetching: action.isFetching,
        selectedCategory: null,
        selectedPost: null,
      };
    default:
      return state;
  }
}
