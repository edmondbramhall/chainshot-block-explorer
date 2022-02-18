<template>
  <div v-if="accountLoaded">
    <section class="hero is-info">       
      <div class="hero-body"> 
        <h1 class="title">Account #{{hash}}</h1>
        <h2 class="subtitle">Balance: ETH {{balance}}</h2>
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
      accountLoaded: false,
      hash: null,
      balance: 0
    }
  },
  methods: {
  },
  async mounted() {
    this.hash = this.$route.params.hash;
    this.balance = await this.$store.dispatch("fetchAccountBalance", { 
      address: this.hash 
    });
    this.accountLoaded = true;
  }
}
</script>

<style>
</style>
