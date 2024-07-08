<template>
  <div v-if="post && user && comments">
    <PostDetail :post="post" :user="user" :comments="comments" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import PostDetail from '../components/PostDetail.vue';

export default {
  name: 'PostDetailPage', 
  components: {
    PostDetail
  },
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