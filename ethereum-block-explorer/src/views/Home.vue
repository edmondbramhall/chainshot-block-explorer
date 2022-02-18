<template>
  <div class="container">
    <section class="section">
      <div class="columns">
        <div class="column">
            <table class="table is-bordered is-striped">
              <thead>
                <th>block #</th>
                <th>txns</th>
                <th>hash</th>
                <th>difficulty</th>
                <th>gas limit</th>
                <th>gas used</th>
                <th>timestamp</th>
                <th>&nbsp;</th>
              </thead>
              <tbody>
                <tr v-for="block in blocks" :key="block.hash">
                  <td>{{block.number}}</td>
                  <td>{{block.transactions.length}}</td>
                  <td><router-link :to="{ name: 'block', params: { hash: block.hash }}">{{shortenHex(block.hash)}}</router-link></td>
                  <td>{{block.difficulty}}</td>
                  <td>{{block.gasLimit}}</td>
                  <td>{{block.gasUsed}}</td>
                  <td>{{block.timestamp}}</td>
                  <td><router-link :to="{ name: 'block', params: { hash: block.hash }}" class="button is-small">details</router-link></td>
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
                    <th><router-link :to="{ name: 'account', params: { hash: tx.from }}">{{shortenHex(tx.from)}}</router-link></th>
                    <th><router-link :to="{ name: 'account', params: { hash: tx.to }}">{{shortenHex(tx.to)}}</router-link></th>
                    <th>{{shortenHex(tx.hash)}}</th>
                    <th>{{weiToEther(tx.value)}}</th>
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
import { ethers } from 'ethers'
export default {
  data() {
    return {  
    }
  },
  methods: {
    shortenHex(hex) {
      if (hex === null) return "";
      return `${hex.substring(0, 4)}...${hex.substring(hex.length-4)}`;
    },
    weiToEther(wei) {
      const ether = ethers.utils.formatEther(wei);
      return parseFloat(ether).toFixed(2);      
    }
  },
  computed: {
    blocks() {
      return this.$store.getters.blocks;
    },
    whaleTransactions() {
      return this.$store.getters.whaleTransactions;
    }
  },
  mounted() {

  }
}
</script>

<style>

</style>
