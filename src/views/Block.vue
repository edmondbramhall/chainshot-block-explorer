<template>
  <div v-if="blockLoaded">
    <section class="hero is-info">       
      <div class="hero-body"> 
        <h1 class="title">Block #{{block.number}}</h1>
        <table class="table is-striped is-bordered">
          <thead>
            <tr>
              <th>hash</th>
              <th>miner</th>
              <th>nonce</th>
              <th>parent hash</th>
              <th>timestamp</th>
              <th>gas limit</th>
              <th>gas used</th>
              <th>difficulty</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{shortenHex(block.hash)}}</td>
              <td><router-link :to="{ name: 'account', params: { hash: block.miner }}">{{shortenHex(block.miner)}}</router-link></td>
              <td>{{block.nonce}}</td>
              <td>{{shortenHex(block.parentHash)}}</td>
              <td>{{formatTimestamp(block.timestamp)}}</td>
              <td>{{block.gasLimit}}</td>
              <td>{{block.gasUsed}}</td>
              <td>{{block._difficulty}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    <section class="section">
      <h2 class="subtitle">{{block.transactions.length}} transactions</h2>
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
          <tr v-for="tx in block.transactions">
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
      blockLoaded: false,
      block: null
    }
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
