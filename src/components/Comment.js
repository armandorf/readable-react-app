import React from 'react';
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
import FaAngleDown from 'react-icons/lib/fa/angle-down';
import FaAngleUp from 'react-icons/lib/fa/angle-up';

export const Comment = ({ post, comment, isListItem, voteComment }) => (

  <div>
    <h4>{comment ? comment.name : ''}</h4>

    {comment &&
    <Media>
      <Media.Left>
        <div className='vote-score'>
          <button onClick={voteComment ? () => voteComment(post, comment, 'upVote') : () => {}} className='icon-btn'>
            <FaAngleUp size={25}/>
          </button>
          {comment.voteScore}
          <button onClick={voteComment ? () => voteComment(post, comment, 'downVote') : () => {}} className='icon-btn'>
            <FaAngleDown size={25}/>
          </button>
        </div>
      </Media.Left>
      <Media.Body>
        <p className='item-content'>{comment.body}</p>
        <p className='item-metadata'>updated on {(new Date(comment.timestamp)).toDateString()} by {comment.author}</p>
        <div>
          <span className='comment-edit-section'>Edit</span>
          <span> </span>
          <span className='comment-edit-section'>Delete</span></div>
      </Media.Body>
    </Media>
    }

  </div>

);

export default Comment;
