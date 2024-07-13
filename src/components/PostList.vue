<template>
  <div>
    
    <div>
      <label v-for="user in users" :key="user.name">
        <input type="checkbox" :value="user.name" v-model="selectedNames" />
        {{ user.name }}
      </label>
    </div>
    <button @click="filterPosts">Filter</button>

    
    <div>
      <button @click="sortPosts('userName', 'asc')">Sort by User Name Asc</button>
      <button @click="sortPosts('userName', 'desc')">Sort by User Name Desc</button>
      <button @click="sortPosts('title', 'asc')">Sort by Title Asc</button>
      <button @click="sortPosts('title', 'desc')">Sort by Title Desc</button>
    </div>

    
    <div class="list-group">
      <a
        v-for="post in filteredPosts"
        :key="post.id"
        :href="'/post/' + post.id"
        class="list-group-item list-group-item-action"
      >
        <h5 class="mb-1">{{ post.title }}</h5>
        <p class="mb-1">{{ post.body }}</p>
        <small>By: {{ getUserName(post.userId) }}</small>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    posts: Array,
    users: Array
  },
  data() {
    return {
      selectedNames: [],
      filteredPosts: this.posts
    };
  },
  methods: {
    getUserName(userId) {
      const user = this.users.find(user => user.id === userId);
      return user ? user.name : 'Unknown';
    },
    filterPosts() {
      if (this.selectedNames.length === 0) {
        this.filteredPosts = this.posts;
      } else {
        this.filteredPosts = this.posts.filter(post =>
          this.selectedNames.includes(this.getUserName(post.userId))
        );
      }
    },
    sortPosts(field, order) {
      this.filteredPosts.sort((a, b) => {
        let fieldA, fieldB;
        if (field === 'userName') {
          fieldA = this.getUserName(a.userId).toLowerCase();
          fieldB = this.getUserName(b.userId).toLowerCase();
        } else if (field === 'title') {
          fieldA = a.title.toLowerCase();
          fieldB = b.title.toLowerCase();
        }
        if (fieldA < fieldB) {
          return order === 'asc' ? -1 : 1;
        }
        if (fieldA > fieldB) {
          return order === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
  },
  watch: {
    posts(newPosts) {
      this.filteredPosts = newPosts;
    }
  }
};
</script>
