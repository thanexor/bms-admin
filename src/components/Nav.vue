<template>
  <div class="col-side">
    <h1 class="site-title">Bad Movie Squad</h1>
    <nav class="side-nav">
      <ul>
        <router-link to="/upcoming">Upcoming</router-link>
        <router-link to="/list">List</router-link>
        <router-link to="/watched">Watched</router-link>
        <router-link to="/scores">Scores</router-link>
        <router-link to="/rules">Rules</router-link>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Nav'
}
</script>
