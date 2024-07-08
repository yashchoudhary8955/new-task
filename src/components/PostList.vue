<template>
  <div class="list-group">
    <a
      v-for="post in posts"
      :key="post.id"
      :href="'/post/' + post.id"
      class="list-group-item list-group-item-action"
    >
      <h5 class="mb-1">{{ post.title }}</h5>
      <p class="mb-1">{{ post.body }}</p>
      <small>By: {{ getUserName(post.userId) }}</small>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    posts: Array,
    users: Array
  },
  methods: {
    getUserName(userId) {
      const user = this.users.find(user => user.id === userId);
      return user ? user.name : 'Unknown';
    }
  }
};
</script>
