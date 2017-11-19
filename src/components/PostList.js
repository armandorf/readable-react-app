import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Post from './Post';
import sortBy from 'sort-by';
import {
  ButtonToolbar,
  DropdownButton,
  MenuItem,
  Media,
  Button,
  Modal,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
} from 'react-bootstrap';
import uniqid from 'uniqid';
import { username } from '../utils/requestOptions';

class PostList extends Component {
  state = {
    sortFlag: false,
    showModal: false,
    hasSelectedCategory: true,
    newPost: {
      category: 'Select a category',
    },
  };

  sortPostsBy = key => () => {
    this.props.posts.sort(sortBy(key));
    this.setState({ sortFlag: !this.state.sortFlag });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  openModal = () => {
    this.setState({ showModal: true });
  };

  assignTitleValue = e => {
    this.setState({
      newPost: {
        ...this.state.newPost,
        title: e.target.value,
      },
    });
  };

  assignBodyValue = e => {
    this.setState({
      newPost: {
        ...this.state.newPost,
        body: e.target.value,
      },
    });
  };

  assignCategoryValue = e => {
    this.setState({
      newPost: {
        ...this.state.newPost,
        category: e.target.value,
      },
    });
  };

  createPostAndCloseModal = () => {
    if (this.state.newPost.category === 'Select a category') {
      this.setState({ hasSelectedCategory: false });
      return;
    }

    this.props.createPost({
      ...this.state.newPost,
      id: uniqid(),
      timestamp: Date.now(),
      author: username,
    });
    this.setState({ newPost: {} });
    this.closeModal();
  };

  render() {
    const {
      history,
      categories,
      posts,
      votePost,
      createComment,
      updateComment,
      voteComment,
    } = this.props;

    return (
      <div>

        <h2>Posts</h2>
        <ButtonToolbar>
          <DropdownButton bsSize="small" bsStyle='default' title='Sort by' id='sort-by-buttons'>
            <MenuItem onSelect={this.sortPostsBy('-voteScore')}>Vote Score</MenuItem>
            <MenuItem onSelect={this.sortPostsBy('timestamp')}>Date Created</MenuItem>
            <MenuItem onSelect={this.sortPostsBy('title')}>Title</MenuItem>
          </DropdownButton>
          <Button bsSize="small" bsStyle="primary" onClick={this.openModal}>Create new post</Button>
        </ButtonToolbar>

        <Media.List className='post-list'>
          {posts && posts.map(post => (
            <Media.ListItem key={post.id}>
              <Post
                history={history}
                post={post}
                isListItem={true}
                votePost={votePost}
                createComment={createComment}
                updateComment={updateComment}
                voteComment={voteComment}
              />
            </Media.ListItem>
          ))}
        </Media.List>

        {/* Modal for creating a Post */}
        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup controlId="titleEditing">
                <ControlLabel>Title</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.title}
                  onChange={this.assignTitleValue}
                />
              </FormGroup>
              <FormGroup controlId="bodyEditing">
                <ControlLabel>Body</ControlLabel>
                <FormControl
                  componentClass="textarea"
                  value={this.state.body}
                  onChange={this.assignBodyValue}
                />
              </FormGroup>
              <FormGroup controlId="categoryEditing">
                <ControlLabel>Category</ControlLabel>
                <FormControl
                  componentClass="select"
                  value={this.state.newPost.category}
                  onChange={this.assignCategoryValue}
                >
                  <option key='categorySelection' value='Select a category'>Please select a category</option>
                  {categories && categories.map(category => (
                    <option key={category.path} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </FormControl>
                {!this.state.hasSelectedCategory && (<HelpBlock>You must select a category</HelpBlock>)}
              </FormGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeModal}>Close</Button>
            <Button bsStyle="primary" onClick={this.createPostAndCloseModal}>Save changes</Button>
          </Modal.Footer>
        </Modal>

      </div>
    );
  };
}

PostList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  createPost: PropTypes.func.isRequired,
  votePost: PropTypes.func.isRequired,
  createComment: PropTypes.func,
  updateComment: PropTypes.func,
  voteComment: PropTypes.func,
};

export default PostList;
