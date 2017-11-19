import React from 'react';
import PropTypes from 'prop-types';
import PostList from './PostList';
import sortBy from 'sort-by';
import {
  ButtonGroup,
  Button,
} from 'react-bootstrap';

const Category = ({
  history,
  category,
  createPost,
  votePost,
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
      history={history}
      categories={category ? [category] : []}
      posts={
        category
          ? Object.keys(category.posts).reduce((postsAcc, postId) => postsAcc.concat(category.posts[postId]), []).sort(sortBy('-voteScore'))
          : []
      }
      createPost={createPost}
      votePost={votePost}
      createComment={createComment}
      updateComment={updateComment}
      voteComment={voteComment}
    />
    
  </div>

);

Category.propTypes = {
  history: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired,
  createPost: PropTypes.func.isRequired,
  votePost: PropTypes.func.isRequired,
  createComment: PropTypes.func.isRequired,
  updateComment: PropTypes.func.isRequired,
  voteComment: PropTypes.func.isRequired,
};

export default Category;
