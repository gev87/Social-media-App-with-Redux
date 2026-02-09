import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';
import { client } from '../../api/client';

const initialReactions = {
  thumbsUp: 0,
  heart: 0,
  rocket: 0,
  raisingHands: 0,
  eyes: 0,
};

const initialState = { posts: [], status: 'idle', error: null };

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts');
  return response.data;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        if (existingPost.reactions) {
          existingPost.reactions[reaction]++;
        }
      }
    },
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            title,
            content,
            id: nanoid(),
            user: userId,
            date: new Date().toISOString(),
            reactions: initialReactions,
          },
        };
      },
    },

    postUpdated(state, action) {
      const { id, title, content } = action.payload;
      const existingPost = state.posts.find((post) => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
        existingPost.date = new Date().toISOString();
      }
    },
  },
});

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions;

export const selectAllPosts = (state) => state.posts.posts;

export const selectPostById = (state, postId) =>
  state.posts.posts.find((post) => post.id === postId);

export default postsSlice.reducer;
