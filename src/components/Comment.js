import React, { Component } from 'react';
import {
  ButtonGroup,
  Media,
  Button,
  Modal,
  FormGroup,
  ControlLabel,
  FormControl,
} from 'react-bootstrap';
import FaAngleDown from 'react-icons/lib/fa/angle-down';
import FaAngleUp from 'react-icons/lib/fa/angle-up';

class Comment extends Component {
  state = {
    showModal: false,
    body: '',
  };

  assignBodyValue = e => {
    e.preventDefault();
    this.setState({
      body: e.target.value,
    });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  openModal = () => {
    this.setState({
      showModal: true,
      body: this.props.comment ? this.props.comment.body : '',
    });
  };

  updateCommentAndCloseModal = (post, comment) => () => {
    this.props.updateComment(post, {
      ...comment,
      body: this.state.body,
      timestamp: Date.now(),
    });
    this.setState({ body: '' });
    this.closeModal();
  };

  render() {
    const {
      post,
      comment,
      voteComment,
      deleteComment,
    } = this.props;

    return (
      <div>
  
        {comment &&
          <div>
    
            <h4>{comment.name}</h4>
            <Media>
              <Media.Left>
                <div className='vote-score'>
                  <button onClick={voteComment ? () => voteComment(post, comment, 'upVote') : () => {
                  }} className='icon-btn'>
                    <FaAngleUp size={25}/>
                  </button>
                  {comment.voteScore}
                  <button onClick={voteComment ? () => voteComment(post, comment, 'downVote') : () => {
                  }} className='icon-btn'>
                    <FaAngleDown size={25}/>
                  </button>
                </div>
              </Media.Left>
              <Media.Body>
                <p className='item-content'>{comment.body}</p>
                <p className='item-metadata'>updated on {(new Date(comment.timestamp)).toDateString()} by {comment.author}</p>
                <ButtonGroup>
                  <Button
                    className='btn-link'
                    bsSize="small"
                    bsStyle="link"
                    onClick={this.openModal}>
                    Edit
                  </Button>
                  <Button
                    className='btn-link'
                    bsSize="small"
                    bsStyle="link"
                    onClick={deleteComment ? () => deleteComment(post, comment) : () => {}}>
                    Delete
                  </Button>
                </ButtonGroup>
              </Media.Body>
            </Media>
    
            {/* Modal for editing Comment */}
            <Modal show={this.state.showModal} onHide={this.closeModal}>
              <Modal.Header closeButton>
                <Modal.Title>Edit comment</Modal.Title>
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
                <Button bsStyle="primary" onClick={this.updateCommentAndCloseModal(post, comment)}>Save changes</Button>
              </Modal.Footer>
            </Modal>
    
          </div>
        }

      </div>
    );
  };
};

export default Comment;
