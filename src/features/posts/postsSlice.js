import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { id: '0', title: 'First Post!', content: 'Bitcoin to the moon' },
  { id: '1', title: 'Second Post!', content: 'Kale is healthy' },
];

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(title, content, userId) {
        return { payload: { title, content, id: userId } };
      },
    },

    postUpdated(state, action) {
      const { id, title, content } = action.payload;
      const existingPost = state.find((post) => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    },
  },
});

export const { postAdded, postUpdated } = postsSlice.actions;

export default postsSlice.reducer;
