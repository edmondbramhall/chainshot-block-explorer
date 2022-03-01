<template>
  <div v-if="accountLoaded">
    <section class="hero is-info">       
      <div class="hero-body"> 
        <h1 class="title">Account #{{hash}}</h1>
        <h2 class="subtitle">Balance: ETH {{balance}}</h2>
      </div>
    </section>
    <section class="section">
      <a @click="$router.go(-1)" class="button is-primary">Back</a>
    </section>
  </div>
</template>
<script>
import utils from '../mixins/utils.js'
export default {
  mixins: [utils],
  data() {
    return {  
      accountLoaded: false,
      hash: null,
      balance: 0
    }
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
