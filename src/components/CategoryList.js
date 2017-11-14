import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PostList from './PostList';
import { DropdownButton, MenuItem, ButtonToolbar } from 'react-bootstrap';

class CategoryList extends Component {

  render() {
    const { categories, posts } = this.props;

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

        <PostList posts={posts} />
  
      </div>
    );
  };
}

export default CategoryList;
