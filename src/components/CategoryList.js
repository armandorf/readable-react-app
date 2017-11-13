import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PostList from './PostList';
import { DropdownButton, MenuItem, ButtonToolbar } from 'react-bootstrap';

class CategoryList extends Component {

  render() {
    return (
      <div>

        <h1>Categories</h1>
        <ul>
          {this.props.categories && this.props.categories.map(category => (
            <li key={category.name}>
              <Link to={`/category/${category.path}`}>{category.name}</Link>
            </li>
          ))}
        </ul>

        <PostList posts={this.props.posts}></PostList>
  
      </div>
    );
  };
}

export default CategoryList;
