import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Media,
         Button,
         Modal,
         FormGroup,
         ControlLabel,
         FormControl,
         DropdownButton,
         MenuItem } from 'react-bootstrap';
import CommentList from './CommentList';
import FaAngleDown from 'react-icons/lib/fa/angle-down';
import FaAngleUp from 'react-icons/lib/fa/angle-up';

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
    this.props.updatePost({
      ...post,
      title: this.state.title,
      body: this.state.body,
    });
    this.closeModal();
  };

  // delete the post and route to post's category page
  deletePost = post => () => {
    this.props.deletePost(post);
    this.props.history.push(`/${post.category}`);
  };

  addCommentAndCloseModal = comment => () => {
    // this.props.addComment(comment);
    this.closeModal();
  };

  render() {
    const { post, isListItem, updatePost, votePost, deletePost } = this.props;

    return (
      <div>

        {/* Detail View */}
        {(!isListItem && post) &&
          <div>
            <span>
              <h1>
                {post.title}
                <span> </span>
                <DropdownButton bsSize="small" bsStyle='default' title='Manage' id='sort-by-buttons'>
                  <MenuItem onSelect={this.openModal}>Edit</MenuItem>
                  <MenuItem onSelect={this.deletePost(post)}>Delete</MenuItem>
                  <MenuItem onSelect={() => {}}>Add Comment</MenuItem>
                </DropdownButton>
              </h1>
            </span>
            <p className='item-metadata'>created on {(new Date(post.timestamp)).toDateString()} by {post.author}</p>
            {post.comments && post.comments.length > 0
              ? <p className='comments-total'>{post.comments.length} comments</p>
              : <p className='comments-total'>No comments yet</p>}
            <p className='post-body'>{post.body}</p>

            {/* List of Comments */}
            <h2>Comments</h2>
            <CommentList
              post={post}
              comments={post.comments}
              voteComment={this.props.voteComment}
            />

            {/* Modal for editing a Post */}
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

          </div>

        }

        {/* List Item View*/}
        {(isListItem && post) &&
          <Media>
            <Media.Left>
              <div className='vote-score'>
                <button onClick={votePost ? () => votePost(post, 'upVote') : () => {}} className='icon-btn'>
                  <FaAngleUp size={25}/>
                </button>
                {post.voteScore}
                <button onClick={votePost ? () => votePost(post, 'downVote') : () => {}} className='icon-btn'>
                  <FaAngleDown size={25}/>
                </button>
              </div>
            </Media.Left>
            <Media.Body>
              <Media.Heading>
                <Link to={`/${post.category}/${post.id}`}>{post.title}</Link>
              </Media.Heading>
              <p className='item-metadata'>created on {(new Date(post.timestamp)).toDateString()} by {post.author}</p>
              {post.comments && post.comments.length > 0
                ? <p className='comments-total'>{post.comments.length} comments</p>
                : <p className='comments-total'>No comments yet</p>}
            </Media.Body>
          </Media>
        }

      </div>

    );
  };
}

export default Post;
