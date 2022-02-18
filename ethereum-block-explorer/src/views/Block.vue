<template>
  <div v-if="blockLoaded">
    <section class="hero is-info">       
      <div class="hero-body"> 
        <h1 class="title">Block #{{block.number}}</h1>
        <h2 class="subtitle">{{block.hash}}</h2>
      </div>
    </section>
    <section class="section">
      <table class="table is-striped is-bordered">
        <thead>

        </thead>
      </table>
      <RouterLink to="/" class="button is-primary">Back</RouterLink>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {  
      blockLoaded: false,
      block: null
    }
  },
  methods: {
  },
  async mounted() {
    this.block = await this.$store.dispatch("getBlock", { 
      hash: this.$route.params.hash 
    });
    this.blockLoaded = true;
  }
}
</script>

<style>
</style>
