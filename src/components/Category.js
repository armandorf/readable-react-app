import React from 'react';
import PropTypes from 'prop-types';
import PostList from './PostList';
import sortBy from 'sort-by';
import {
  ButtonGroup,
  Button,
} from 'react-bootstrap';

const Category = ({
  match,
  history,
  category,
  createPost,
  updatePost,
  votePost,
  deletePost,
  createComment,
  updateComment,
  voteComment,
}) => (

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
      match={match}
      history={history}
      categories={category ? [category] : []}
      posts={
        category
          ? Object.keys(category.posts).reduce((postsAcc, postId) => postsAcc.concat(category.posts[postId]), []).sort(sortBy('-voteScore'))
          : []
      }
      createPost={createPost}
      updatePost={updatePost}
      votePost={votePost}
      createComment={createComment}
      updateComment={updateComment}
      voteComment={voteComment}
      deletePost={deletePost}
    />
    
  </div>

);

Category.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired,
  createPost: PropTypes.func.isRequired,
  updatePost: PropTypes.func.isRequired,
  votePost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  createComment: PropTypes.func.isRequired,
  updateComment: PropTypes.func.isRequired,
  voteComment: PropTypes.func.isRequired,
};

export default Category;
