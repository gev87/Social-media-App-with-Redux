import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { Navbar } from './app/Navbar';
import { PostLists } from './features/posts/PostsLists';
import AddFormPost from './features/posts/AddPostForm';
import SinglePostPage from './features/posts/SinglePostPage';
import EditPostForm from './features/posts/EditPostForm';
import { UserPage } from './features/users/UserPage';
import { UsersList } from './features/users/UsersList';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <>
                <AddFormPost />
                <PostLists />
              </>
            )}
          />
          <Route path="/posts/:postId" component={SinglePostPage} />
          <Route path="/edit-post/:postId" component={EditPostForm} />
          <Route exact path="/users" component={UsersList} />
          <Route path="/users/:userId" component={UserPage} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
