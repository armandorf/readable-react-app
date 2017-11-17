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

export const Comment = ({ comment, isListItem }) => (

  <div>
    <h4>{comment ? comment.name : ''}</h4>

    {comment &&
    <Media>
      <Media.Left>
        <div className='vote-score'>
          <FaAngleUp size={25}/>{comment.voteScore}<FaAngleDown size={25}/>
        </div>
      </Media.Left>
      <Media.Body>
        {/*<Media.Heading>*/}
          {/*{comment.body}*/}
        {/*</Media.Heading>*/}
        {comment.body}
        <p className='item-metadata'>created on {(new Date(comment.timestamp)).toDateString()} by {comment.author}</p>
      </Media.Body>
    </Media>
    }

  </div>

);

export default Comment;
