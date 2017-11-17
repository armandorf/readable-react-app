import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import PostList from './PostList';
import sortBy from 'sort-by';

export const Category = ({ category, createPost, match, votePost, voteComment }) => (

  <div>
    <h1>{category ? category.name : ''}</h1>
    
    <PostList
      posts={
        category
          ? Object.keys(category.posts).reduce((postsAcc, postId) => postsAcc.concat(category.posts[postId]), []).sort(sortBy('-voteScore'))
          : []
      }
      createPost={createPost}
      categories={category ? [category] : []}
      votePost={votePost}
      voteComment={voteComment}
    />
    
  </div>

);
