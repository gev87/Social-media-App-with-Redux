import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function SinglePostPage({ match }) {
  const { postId } = match.params;

  const post = useSelector((state) =>
    state.posts.find((post) => post.id === postId)
  );

  return (
    <section className="post">
      <article className="post-details">
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
        <Link className="button" to={`/edit-post/${post.id}`}>
          Edit Post
        </Link>
      </article>
    </section>
  );
}

export default SinglePostPage;
