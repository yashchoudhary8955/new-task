import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state: {
    posts: [],
    users: [],
    post: null,
    user: null,
    comments: []
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    setUsers(state, users) {
      state.users = users;
    },
    setPost(state, post) {
      state.post = post;
    },
    setUser(state, user) {
      state.user = user;
    },
    setComments(state, comments) {
      state.comments = comments;
    }
  },
  actions: {
    async fetchPosts({ commit }) {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      commit('setPosts', response.data);
    },
    async fetchUsers({ commit }) {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      commit('setUsers', response.data);
    },
    async fetchPostDetails({ commit }, postId) {
      const postResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
      const userResponse = await axios.get(`https://jsonplaceholder.typicode.com/users/${postResponse.data.userId}`);
      const commentsResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);

      commit('setPost', postResponse.data);
      commit('setUser', userResponse.data);
      commit('setComments', commentsResponse.data);
    }
  }
});

export default store;
