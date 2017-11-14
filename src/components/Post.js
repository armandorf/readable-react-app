import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Media, Button, Modal, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class Post extends Component {

  state = {
    showModal: false,
    title: '',
    body: '',
  };

  assignTitleValue = e => {
    e.preventDefault();
    this.setState({
      title: e.target.value,
    });
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
      title: this.props.post ? this.props.post.title : '',
      body: this.props.post ? this.props.post.body : '',
    });
  };

  updatePostAndCloseModal = post => () => {
    this.props.post.title = this.state.title;
    this.props.post.body = this.state.body;
    this.props.updatePost(post);
    this.closeModal();
  };

  render() {
    const { post, isListItem, updatePost } = this.props;

    return (
      <div>
        
        {/* Detail View */}
        {(!isListItem && post) &&
          <div>
            <span>
              <h1>
                {post.title}
                <Button
                  bsStyle="link"
                  onClick={this.openModal}>
                  (edit)
                </Button>
              </h1>
            </span>
            <p>{post.body}</p>
            <p>created on {new Date(post.timestamp).toDateString()} with vote score {post.voteScore}</p>

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
                </form>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.closeModal}>Close</Button>
                <Button bsStyle="primary" onClick={this.updatePostAndCloseModal(post)}>Save changes</Button>
              </Modal.Footer>
            </Modal>

            <h4>Comments go here!!!</h4>

          </div>

        }

        {/* List Item View*/}
        {(isListItem && post) &&
          <Media>
            <Media.Left>
              <div>
  
              </div>
            </Media.Left>
            <Media.Body>
              <Media.Heading>
                <Link to={`/${post.category}/${post.id}`}>{post.title}</Link>
              </Media.Heading>
              <p>created on {new Date(post.timestamp).toDateString()} with vote
                score {post.voteScore}</p>
              <p>{post.body}</p>
            </Media.Body>
          </Media>
        }

      </div>

    );
  };
}

export default Post;
