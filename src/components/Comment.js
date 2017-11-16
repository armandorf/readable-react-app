import React from 'react';
import { withRouter, Link } from 'react-router-dom';

export const Comment = ({ comment }) => (

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
          {/*<Link to={`/${comment.category}/${comment.id}`}>{comment.title}</Link>*/}
        {/*</Media.Heading>*/}
        <p className='item-metadata'>created on {(new Date(comment.timestamp)).toDateString()} by {comment.author}</p>
      </Media.Body>
    </Media>
    }

  </div>

);
