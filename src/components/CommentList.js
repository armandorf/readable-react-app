import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Post from './Post';
import sortBy from 'sort-by';
import { ButtonToolbar,
  DropdownButton,
  MenuItem,
  Media,
  Button,
  Modal,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock } from 'react-bootstrap';
import uniqid from 'uniqid';
import { username } from '../utils/requestOptions';
import Comment from './Comment';

class CommentList extends Component {
  state = {
    showModal: false,
    newComment: {},
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  openModal = () => {
    this.setState({ showModal: true });
  };

  assignBodyValue = e => {
    this.setState({
      newComment: {
        ...this.state.newComment,
        body: e.target.value,
      },
    });
  };

  createCommentAndCloseModal = post => () => {
    this.props.createComment(post, {
      ...this.state.newComment,
      id: uniqid(),
      timestamp: Date.now(),
      author: username,
      parentId: post.id,
    });

    this.setState({ newComment: {} });
    this.closeModal();
  };

  render() {
    const { post, comments, createComment, voteComment, deleteComment } = this.props;

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
                  value={this.state.newComment.body}
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

export default CommentList;
