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

  render() {
    const { comments } = this.props;

    return (
      <div>
        <Media.List className='post-list'>
          {comments && comments.map(comment => (
            <Media.ListItem key={comment.id}>
              <Comment comment={comment} isListItem={true}/>
            </Media.ListItem>
          ))}
        </Media.List>
      </div>
    );
  };
}

export default CommentList;
