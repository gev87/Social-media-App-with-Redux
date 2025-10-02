import {  useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PostAuthor from './PostAuthor';

export const PostLists = () => {
  const posts = useSelector((state) => state.posts);
 

  const renderedPosts = posts.map((post) => (
    <article key={post.id} className="post-excerpt">
      <h3>{post.title}</h3>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <Link className="button muted-button" to={`/posts/${post.id}`}>
        View Post
      </Link>
      <PostAuthor userId={post.id} />
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
