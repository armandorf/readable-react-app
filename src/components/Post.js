import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Media } from 'react-bootstrap';

export const Post = ({ match, post, isListItem }) => (
  <div>
    
    Edit 
    
    {/* Detail View */}
    {(!isListItem && post) &&
      <div>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
        <p>created on {new Date(post.timestamp).toDateString()} with vote score {post.voteScore}</p>
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
          <p>created on {new Date(post.timestamp).toDateString()} with vote score {post.voteScore}</p>
          <p>{post.body}</p>
        </Media.Body>
      </Media>
    }

    {/*<h4>Comments go here!!!</h4>*/}

  </div>
);
