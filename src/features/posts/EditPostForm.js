import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postUpdated } from './postsSlice';
import { useHistory } from 'react-router-dom';

function EditPostForm({ match }) {
  const { postId } = match.params;
  const history = useHistory();

  const post = useSelector((state) =>
    state.posts.find((post) => post.id === postId)
  );
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const dispatch = useDispatch();

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const onContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      id: postId,
      title,
      content,
    };
    if (title.trim() === '' || content.trim() === '') {
      return;
    }
    dispatch(postUpdated(payload));
    history.push(`/posts/${postId}`);
    setTitle('');
    setContent('');
  };

  return (
    <section>
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChange}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChange}
        />
        <button>Save Changes</button>
      </form>
    </section>
  );
}

export default EditPostForm;
