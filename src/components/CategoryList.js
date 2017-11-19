import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PostList from './PostList';

class CategoryList extends Component {

  render() {
    const { categories, createPost, posts, votePost } = this.props;

    return (
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
          posts={posts}
          createPost={createPost}
          categories={categories}
          votePost={votePost}
        />
        
      </div>
    );
  };
}

export default CategoryList;
