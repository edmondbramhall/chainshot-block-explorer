<template>
  <div v-if="isLoaded">
    <section class="hero is-info">       
      <div class="hero-body"> 
        <h1 class="title">Transaction #{{hash}}</h1>
        <table class="table is-striped is-bordered">
          <thead>
            <tr>
              <th>hash</th>
              <th>confirmations</th>
              <th>from</th>
              <th>to</th>
              <th>value</th>
              <th>gas limit</th>
              <th>gas price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><router-link :to="{ name: 'transaction', params: { hash: tx.hash }}">{{shortenHex(tx.hash)}}</router-link></td>
              <td>{{tx.confirmations}}</td>
              <td><router-link :to="{ name: 'account', params: { hash: tx.from }}">{{shortenHex(tx.from)}}</router-link></td>
              <td><router-link :to="{ name: 'account', params: { hash: tx.to }}">{{shortenHex(tx.to)}}</router-link></td>
              <td>{{weiToEther(tx.value)}}</td>
              <td>{{tx.gasLimit}}</td>
              <td>{{tx.gasPrice}}</td>
            </tr>
          </tbody>
        </table>
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
      isLoaded: false,
      tx: null,
      hash: null
    }
  },
  async mounted() {
    this.hash = this.$route.params.hash;
    this.tx = await this.$store.dispatch("fetchTransaction", { 
      txHash: this.hash 
    });
    this.isLoaded = true;
  }
}
</script>

<style>
</style>
