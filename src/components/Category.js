import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import PostList from './PostList';

export const Category = ({ category, match }) => (

  <div>
    <h1>{category ? category.name : ''}</h1>
    
    {/*<pre><h2><strong>Category:</strong></h2> {JSON.stringify(category, null, '  ')}</pre>*/}
    <PostList
      posts={
        category
          ? Object.keys(category.posts).reduce((postsAcc, postId) => postsAcc.concat(category.posts[postId]), [])
          : []
      }
    />
    
  </div>

);
