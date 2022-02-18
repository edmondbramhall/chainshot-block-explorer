<template>
  <div>
    <nav class="navbar is-light" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <RouterLink to="/" class="navbar-item subtitle">Ethereum block explorer ({{selectedNetwork}})</RouterLink>
      </div>
      <div class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item">
          </a>
          <div class="navbar-item">
            <div class="field has-addons">
              <p class="control has-icons-left">
                <input v-model="selectedAccount" id="address" class="input" style="width:500px;" placeholder="public address"/>
                <span class="icon is-small is-left">
                  <i class="fas fa-wallet"></i>
                </span>
              </p>
              <div class="control">
                <a @click="showAccount()" class="button">
                  Show account
                </a>
              </div>
            </div>             
          </div>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <p>gas price: {{$store.getters.gasPrice}}</p>
          </div>
          <div class="navbar-item">  
            <div class="field">
              <p class="control has-icons-left">
                <span class="select">
                  <select v-model="selectedNetwork" @change="changeNetwork()">
                    <option value="homestead" selected>Homestead</option>
                    <option value="rinkeby">Rinkeby</option>
                  </select>
                </span>
                <span class="icon is-small is-left">
                  <i class="fas fa-globe"></i>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <RouterView />
  </div>
</template>
<script>
import { RouterLink, RouterView } from 'vue-router'
import { ethers } from 'ethers'

export default {
  data() {
    return {  
      selectedNetwork: "homestead",
      selectedAccount: ""
    }
  },
  computed: {

  },
  methods: {
    changeNetwork() {
      this.$store.dispatch("changeNetwork", {
        networkName: this.selectedNetwork
      });    
    },
    showAccount() {
      if (this.selectedAccount.length > 0) {
        this.$router.push({ name: "account", params: { hash: this.selectedAccount} });
        this.selectedAccount = "";
      }
    }
  },
  async mounted() {
    await this.$store.dispatch("fetchLatestBlock");
    await this.$store.dispatch("fetchGasPrice");
    setInterval(async () => { 
      await this.$store.dispatch("fetchLatestBlock");
    }, 2000);
    setInterval(async () => { 
      await this.$store.dispatch("fetchGasPrice");
    }, 10000);
  }
}
</script>
<style>
@import '@/assets/base.css';
</style>
