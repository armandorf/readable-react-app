import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import PostList from './PostList';

export const Category = ({ category, createPost, match }) => (

  <div>
    <h1>{category ? category.name : ''}</h1>
    
    <PostList
      posts={
        category
          ? Object.keys(category.posts).reduce((postsAcc, postId) => postsAcc.concat(category.posts[postId]), [])
          : []
      }
      createPost={createPost}
      categories={category ? [category] : []}
    />
    
  </div>

);
