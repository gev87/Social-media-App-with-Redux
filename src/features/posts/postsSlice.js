import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialReactions = { thumbsUp: 0, heart: 0, rocket: 0, raisingHands: 0, eyes: 0 };

const initialState = [
  {
    id: '0',
    title: 'First Post!',
    content: 'Bitcoin to the moon',
    date: '',
    reactions: initialReactions,
  },
  {
    id: '1',
    title: 'Second Post!',
    content: 'Kale is healthy',
    date: '',
    reactions: initialReactions,
  },
];


const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.find((post) => post.id === postId);
      if (existingPost) {
        if (existingPost.reactions) {
          existingPost.reactions[reaction]++;
        }
      }
    },
    postAdded: {
      reducer(state, action) {
        state.push(action.payload);
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
      const existingPost = state.find((post) => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
        existingPost.date = new Date().toISOString();
      }
    },
  },
});

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
