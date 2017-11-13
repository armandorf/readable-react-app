import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import sortBy from 'sort-by';
import { DropdownButton, MenuItem, ButtonToolbar } from 'react-bootstrap';

class PostList extends Component {
  state = {
    sortFlagRender: false,
  };

  sortPostsBy = key => () => {
    this.props.posts.sort(sortBy(key));
    this.setState({ sortFlagRender: !this.state.sortFlagRender }); // trigger a re-render
  };

  render() {
    return (
      <div>

        <h1>Posts</h1>
        <DropdownButton bsSize="small" bsStyle='default' title='Sort by' id='sort-by-buttons'>
          <MenuItem onSelect={this.sortPostsBy('timestamp')}>Date Created</MenuItem>
          <MenuItem onSelect={this.sortPostsBy('-voteScore')}>Vote Score</MenuItem>
          <MenuItem onSelect={this.sortPostsBy('title')}>Title</MenuItem>
        </DropdownButton>
        <ul>
          {this.props.posts && this.props.posts.map(post => (
            <li key={post.id}>
              <Link to={`/post/${post.id}`}>{post.title}</Link> created on {new Date(post.timestamp).toDateString()} with vote score {post.voteScore}

            </li>
          ))}
        </ul>

      </div>
    );
  };
}

export default PostList;
