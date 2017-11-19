import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PostList from './PostList';

const CategoryList = ({ history, categories, posts, createPost, votePost }) => (
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
      history={history}
      categories={categories}
      posts={posts}
      createPost={createPost}
      votePost={votePost}
    />
    
  </div>

);

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  createPost: PropTypes.func.isRequired,
  votePost: PropTypes.func.isRequired,
};

export default CategoryList;
