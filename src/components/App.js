import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Link, Switch } from 'react-router-dom';
import sortBy from 'sort-by';
import Loading from 'react-loading';
import FaSortDesc from 'react-icons/lib/fa/sort-desc';
import './App.css';
import { fetchAllCategoriesAndPosts } from '../actions/categories';
import { requestPostUpdate, requestPostCreate, requestPostVote, requestPostDelete } from '../actions/posts';
import { fetchCommentsForPost, requestCommentVote, requestCommentDelete } from '../actions/comments';
import CategoryList from './CategoryList';
import { Category } from './Category';
import Post from './Post';
import { options, baseUrl, headers } from '../utils/requestOptions';

class App extends Component {

  componentDidMount() {
    this.props.getAllCategoriesAndPosts();
  }

  render() {

    return (

      <div className="main">
        
        <Switch>
          <Route exact path='/' render={() => (
            <CategoryList
              categories={this.props.allCategories}
              posts={this.props.allPosts}
              createPost={this.props.createPost}
              votePost={this.props.votePost}
              voteComment={this.props.voteComment}
            />
          )} />
          <Route exact path='/:categoryPath' render={({ match }) => (
            <Category
              category={this.props.allCategories.find(category => category.path === match.params.categoryPath)}
              createPost={this.props.createPost}
              votePost={this.props.votePost}
              voteComment={this.props.voteComment}
              match={match}
            />
          )}>
          </Route>
          <Route path='/:categoryPath/:postId' render={({ match, history }) => (
            <Post
              post={this.props.allPosts.find(post => post.id === match.params.postId)}
              updatePost={this.props.updatePost}
              votePost={this.props.votePost}
              voteComment={this.props.voteComment}
              deletePost={this.props.deletePost}
              deleteComment={this.props.deleteComment}
              match={match}
              history={history}
            />
          )}>
          </Route>
        </Switch>
        
      </div>

    );
  }
}

function mapStateToProps({ postsByCategory, isFetching, selectedCategory, selectedPost, selectedComment }) {
  return {
    isFetching,
    selectedCategory,
    selectedPost,
    selectedComment,
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
    voteComment: (post, comment, value) => dispatch(requestCommentVote(post, comment, value)),
    deletePost: post => dispatch(requestPostDelete(post)),
    deleteComment: (post, comment) => dispatch(requestCommentDelete(post, comment)),
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(App));
