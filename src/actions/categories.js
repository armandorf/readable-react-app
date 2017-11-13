import { baseUrl, httpGetRequestOptions } from '../utils/requestOptions';
import { fetchAllPosts } from './posts';
import { requestingItems, receivedItems, } from './fetchingStatus';

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const SELECT_CATEGORY = 'SELECT_CATEGORY';

export const receiveCategories = json => ({
  type: RECEIVE_CATEGORIES,
  items: json.categories,
});

export const fetchAllCategoriesAndPosts = () => dispatch => {

  // indicate that items are being fetched
  dispatch(requestingItems());

  return fetch(`${baseUrl}/categories`, httpGetRequestOptions)
    .then(
      response => response.json(),
      error => console.log('An error occurred while retrieving all categories.', error),
    )
    .then(json => {
      dispatch(receiveCategories(json));

      // signal async operation has ended
      dispatch(receivedItems());

      // fetch posts and attach them to the categories
      dispatch(fetchAllPosts());
    });
};

export const selectCategory = category => ({
  type: SELECT_CATEGORY,
  selectedCategory: category,
});
