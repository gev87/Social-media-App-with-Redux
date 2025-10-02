import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postAdded } from './postsSlice';

function AddFormPost() {
  const [title, setTitle] = useState("");
  const [content,setContent] = useState('');
  const [userId, setUserId] = useState('');

  const dispatch = useDispatch();

  const users = useSelector((state) => state.users);

  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const onContentChange = (e) => {
    setContent(e.target.value);
  };

  const onAuthorChange = (e) => {
    setUserId(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === '' || content.trim() === '' || userId.trim() === "") return;
  

    dispatch(postAdded(title, content, userId));
    setTitle('');
    setContent('');
  };

  console.log("userId", userId);

  return (
    <section>
      <h2>Add A New Post</h2>
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
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChange}>
          <option value=""></option>
          {userOptions}
        </select>
        <button disabled={!(title && content && userId)}>Save Post</button>
      </form>
    </section>
  );
}

export default AddFormPost;
