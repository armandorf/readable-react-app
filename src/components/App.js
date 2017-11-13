import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Link, Switch } from 'react-router-dom';
import sortBy from 'sort-by';
import Loading from 'react-loading';
import FaSortDesc from 'react-icons/lib/fa/sort-desc';
import './App.css';
import { fetchAllCategoriesAndPosts } from '../actions/categories';
import CategoryList from './CategoryList';
import { Category } from './Category';
import { Post } from './Post';
import { options, baseUrl, headers } from '../utils/requestOptions';

class App extends Component {

  componentDidMount() {
    this.props.getAllCategoriesAndPosts();
  }

  render() {

    return (

      <div>
        
        <Switch>
          <Route exact path='/' render={() => (
            <CategoryList
              categories={this.props.allCategories}
              posts={this.props.allPosts}
            />
          )} />
          <Route path='/category/:categoryPath' render={({ match }) => (
            <Category
              category={this.props.allCategories.find(category => category.path === match.params.categoryPath)}
              match={match}
            />
          )}>
          </Route>
          <Route path='/post/:postId' render={({ match }) => (
            <Post
              post={this.props.allPosts.find(post => post.id === match.params.postId)}
              match={match}/>
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
    // getAllPosts: () => dispatch(fetchAllPosts()),
    // getPostsForCategory: () => dispatch(fetchAllPostsForCategory()),
    // savePost: (post) => dispatch(savePost(post)),
    // saveComment: (comment) => dispatch(saveComment(comment)),
    // getAllCommentsForPost: () => dispatch();
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(App));