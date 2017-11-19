import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Media,
  Button,
  Modal,
  FormGroup,
  ControlLabel,
  FormControl,
} from 'react-bootstrap';
import uniqid from 'uniqid';
import { username } from '../utils/requestOptions';
import Comment from './Comment';

class CommentList extends Component {
  state = {
    showModal: false,
    body: '',
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  openModal = () => {
    this.setState({ showModal: true });
  };

  assignBodyValue = e => {
    this.setState({ body: e.target.value });
  };

  createCommentAndCloseModal = post => () => {
    this.props.createComment(post, {
      id: uniqid(),
      timestamp: Date.now(),
      body: this.state.body,
      author: username,
      parentId: post.id,
    });
    this.setState({ body: '' });
    this.closeModal();
  };

  render() {
    const {
      post,
      comments,
      updateComment,
      voteComment,
      deleteComment,
    } = this.props;

    return (

      <div>

        <h2>Comments</h2>
        <Button bsSize="small" bsStyle="primary" onClick={this.openModal}>Add comment</Button>
        <Media.List className='post-list'>
          {comments && comments.map(comment => (
            <Media.ListItem key={comment.id}>
              <Comment
                post={post}
                comment={comment}
                isListItem={true}
                updateComment={updateComment}
                voteComment={voteComment}
                deleteComment={deleteComment}
              />
            </Media.ListItem>
          ))}
        </Media.List>

        {/* Modal for creating a Comment */}
        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add comment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup controlId="bodyEditing">
                <ControlLabel>Comment</ControlLabel>
                <FormControl
                  componentClass="textarea"
                  value={this.state.body}
                  onChange={this.assignBodyValue}
                />
              </FormGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeModal}>Close</Button>
            <Button bsStyle="primary" onClick={this.createCommentAndCloseModal(post)}>Save changes</Button>
          </Modal.Footer>
        </Modal>
        
      </div>
    );
  };
}

CommentList.propTypes = {
  post: PropTypes.object.isRequired,
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  createComment: PropTypes.func.isRequired,
  updateComment: PropTypes.func.isRequired,
  voteComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

export default CommentList;
