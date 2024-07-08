<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div v-if="post && user && comments" class="card">
          <div class="card-header">
            <h1>{{ post.title }}</h1>
          </div>
          <div class="card-body">
            <h5 class="card-title">By: {{ user.name }}</h5>
            <p class="card-text">{{ post.body }}</p>
          </div>
        </div>
        <div class="card mt-3">
          <div class="card-header">
            <h3>Comments</h3>
          </div>
          <ul class="list-group list-group-flush">
            <li v-for="comment in comments" :key="comment.id" class="list-group-item">
              <h5>{{ comment.name }}</h5>
              <p>{{ comment.body }}</p>
              <small>{{ comment.email }}</small>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'PostDetailPage',
  computed: {
    ...mapState({
      post: state => state.post,
      user: state => state.user,
      comments: state => state.comments
    })
  },
  created() {
    const postId = this.$route.params.id;
    this.$store.dispatch('fetchPostDetails', postId);
  }
}
</script>
