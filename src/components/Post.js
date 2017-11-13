import React from 'react';
import { withRouter, Link } from 'react-router-dom';

export const Post = ({ post, match }) => (
  <div>
    <h1>A post with postId: {match.params.postId}</h1>
    <pre>Post: {JSON.stringify(post, null, '')}</pre>
  </div>
);
