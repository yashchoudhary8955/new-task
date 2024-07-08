<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <h1>Posts</h1>
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search by title"
          class="form-control mb-3"
        />
        <PostList :posts="filteredPosts" :users="users"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import PostList from '../components/PostList.vue';

export default {
  name: 'HomePage',
  components: {
    PostList
  },
  data() {
    return {
      searchQuery: ''
    };
  },
  computed: {
    ...mapState(['posts', 'users']),
    filteredPosts() {
      return this.posts.filter(post =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  created() {
    this.$store.dispatch('fetchPosts');
    this.$store.dispatch('fetchUsers');
  }
};
</script>
