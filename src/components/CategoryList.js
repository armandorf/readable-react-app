import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PostList from './PostList';

const CategoryList = ({
  match,
  history,
  categories,
  posts,
  createPost,
  updatePost,
  votePost,
  deletePost,
}) => (
  <div>

    <h1>Categories</h1>
    <ul>
      {categories && categories.map(category => (
        <li key={category.name}>
          <Link to={`/${category.path}`}>{category.name}</Link>
        </li>
      ))}
    </ul>
    <hr />
    <PostList
      match={match}
      history={history}
      categories={categories}
      posts={posts}
      createPost={createPost}
      updatePost={updatePost}
      votePost={votePost}
      deletePost={deletePost}
    />
    
  </div>

);

CategoryList.propTypes = {
  match: PropTypes.object.isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  createPost: PropTypes.func.isRequired,
  votePost: PropTypes.func.isRequired,
  updatePost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

export default CategoryList;
