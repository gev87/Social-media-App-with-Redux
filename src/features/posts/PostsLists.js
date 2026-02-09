import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from '../reactions/ReactionButtons';
import { fetchPosts, selectAllPosts } from './postsSlice';
import { useEffect } from 'react';

export const PostLists = () => {
  const posts = useSelector(selectAllPosts);
  const dispatch = useDispatch();
  const postStatus = useSelector((state) => state.posts.status);

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);



  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));

  const renderedPosts = orderedPosts.map((post) => (
    <article key={post.id} className="post-excerpt">
      <h3>{post.title}</h3>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <Link className="button muted-button" to={`/posts/${post.id}`}>
        View Post
      </Link>
      <PostAuthor userId={post.id} />
      <TimeAgo timestamp={post.date} />
      <ReactionButtons post={post} />
    </article>
  ));

  return (
    <>
      <section className="posts-list">
        <h2>Posts</h2>
        {renderedPosts}
      </section>
    </>
  );
};
