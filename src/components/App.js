import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import sortBy from 'sort-by';
import './App.css';
import { fetchAllCategoriesAndPosts } from '../actions/categories';
import {
  requestPostUpdate,
  requestPostCreate,
  requestPostVote,
  requestPostDelete,
} from '../actions/posts';
import {
  fetchCommentsForPost,
  requestCreateComment,
  requestCommentUpdate,
  requestCommentVote,
  requestCommentDelete,
} from '../actions/comments';
import CategoryList from './CategoryList';
import Category from './Category';
import Post from './Post';
import Loading from 'react-loading';

class App extends Component {

  componentDidMount() {
    this.props.getAllCategoriesAndPosts();
  }

  render() {

    return (
      <div>
        {this.props.isFetching === true
          ? <Loading delay={200} type='spin' color='#222' className='loading'/>
          : <div className="main">
            <Switch>
              <Route exact path='/' render={() => (
                <CategoryList
                  categories={this.props.allCategories}
                  posts={this.props.allPosts}
                  createPost={this.props.createPost}
                  votePost={this.props.votePost}
                />
              )} />
              <Route exact path='/:categoryPath' render={({ match, history }) => (
                <Category
                  history={history}
                  category={this.props.allCategories.find(category => category.path === match.params.categoryPath)}
                  createPost={this.props.createPost}
                  votePost={this.props.votePost}
                  createComment={this.props.createComment}
                  updateComment={this.props.updateComment}
                  voteComment={this.props.voteComment}
                />
              )}>
              </Route>
              <Route path='/:categoryPath/:postId' render={({ match, history }) => (
                <Post
                  history={history}
                  post={this.props.allPosts.find(post => post.id === match.params.postId)}
                  updatePost={this.props.updatePost}
                  votePost={this.props.votePost}
                  deletePost={this.props.deletePost}
                  createComment={this.props.createComment}
                  updateComment={this.props.updateComment}
                  voteComment={this.props.voteComment}
                  deleteComment={this.props.deleteComment}
                />
              )}>
              </Route>
            </Switch>
          
        </div>
      }
      </div>
    );
  }
}

function mapStateToProps({ postsByCategory, isFetching }) {
  return {
    isFetching,
    allCategories: postsByCategory
      ? Object.keys(postsByCategory).reduce((categoriesAcc, categoryId) => categoriesAcc.concat(postsByCategory[categoryId]), [])
      : [],
    allPosts: postsByCategory
      ? Object.keys(postsByCategory).reduce((finalPostsAcc, categoryId) => {
          let postsWithIdKey = postsByCategory[categoryId].posts;
          let posts = Object.keys(postsWithIdKey).reduce((postsAcc, postId) => {
            let post = postsWithIdKey[postId];
            return postsAcc.concat(post);
          }, []);
          return finalPostsAcc.concat(posts);
        }, []).sort(sortBy('-voteScore')) // initial sorting by voteScore (greater to least)
      : [],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllCategoriesAndPosts: () => dispatch(fetchAllCategoriesAndPosts()),
    updatePost: post => dispatch(requestPostUpdate(post)),
    createPost: post => dispatch(requestPostCreate(post)),
    getCommentsForPost: (post) => dispatch(fetchCommentsForPost(post)),
    votePost: (post, value) => dispatch(requestPostVote(post, value)),
    createComment: (post, comment) => dispatch(requestCreateComment(post, comment)),
    updateComment: (post, comment) => dispatch(requestCommentUpdate(post, comment)),
    voteComment: (post, comment, value) => dispatch(requestCommentVote(post, comment, value)),
    deletePost: post => dispatch(requestPostDelete(post)),
    deleteComment: (post, comment) => dispatch(requestCommentDelete(post, comment)),
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(App));
