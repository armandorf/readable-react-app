import React from 'react';
import PostList from './PostList';
import sortBy from 'sort-by';
import {
  ButtonGroup,
  Button,
} from 'react-bootstrap';

export const Category = ({ match, history, category, createPost, votePost, voteComment }) => (

  <div>
    <ButtonGroup>
      <Button
        className='btn-link'
        bsSize="small"
        bsStyle="link"
        onClick={history.goBack}>
        Go back
      </Button>
    </ButtonGroup>
    <hr />
    <h1>{category ? category.name : ''}</h1>
    <hr />
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
