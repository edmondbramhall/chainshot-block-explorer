<template>
  <div class="container">
    <section class="section">
      <div class="columns">
        <div class="column is-two-thirds">
            <table class="table is-bordered is-striped">
              <thead>
                <th>block #</th>
                <th>txns</th>
                <th>hash</th>
                <th>difficulty</th>
                <th>gas limit</th>
                <th>gas</th>
                <th>timestamp</th>
              </thead>
              <tbody>
                <tr v-for="block in blocks" :key="block.hash">
                  <td>{{block.number}}</td>
                  <td>{{block.transactions.length}}</td>
                  <td><router-link :to="{ name: 'block', params: { hash: block.hash }}">{{shortenHex(block.hash)}}</router-link></td>
                  <td>{{block._difficulty}}</td>
                  <td>{{block.gasLimit}}</td>
                  <td>{{block.gasUsed}}</td>
                  <td>{{formatTimestamp(block.timestamp)}}</td>
                </tr>
              </tbody>
            </table>
        </div>
        <div class="column">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                Top {{whaleTransactions.length}} whale txns!
              </p>
            </header>
            <div class="card-content">
              <table class="table">
                <thead>
                  <th>From</th>
                  <th>To</th>
                  <th>Txn #</th>
                  <th>ETH</th>
                </thead>
                <tbody>
                  <tr v-for="tx in whaleTransactions" :key="tx.hash">
                    <td><router-link :to="{ name: 'account', params: { hash: tx.from }}">{{shortenHex(tx.from)}}</router-link></td>
                    <td><router-link :to="{ name: 'account', params: { hash: tx.to }}">{{shortenHex(tx.to)}}</router-link></td>
                    <td><router-link :to="{ name: 'transaction', params: { hash: tx.hash }}">{{shortenHex(tx.hash)}}</router-link></td>
                    <td>{{weiToEther(tx.value)}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import utils from '../mixins/utils.js'
export default {
  mixins: [utils],
  data() {
    return {  
    }
  },
  computed: {
    blocks() {
      return this.$store.getters.blocks;
    },
    whaleTransactions() {
      return this.$store.getters.whaleTransactions;
    }
  }
}
</script>

<style>

</style>
