import { createApp } from 'vue'
import { createStore } from 'vuex'
import { ethers } from 'ethers'
import App from './App.vue'
import router from './router'

let _provider = new ethers.providers.EtherscanProvider("homestead", import.meta.env.VITE_ETHERSCANAPIKEY);
const store = createStore({
    state () {
        return {
            blocks: [],
            whaleTransactions: [],
            latestBlockNumber: 0,
            gasPrice: 0
        }
    },
    mutations: {
        clearState (state) {
            state.blocks = [];
            state.whaleTransactions = [];
            state.latestBlockNumber = 0;
        },
        updateGasPrice (state, newGasPrice) {
            state.gasPrice = newGasPrice;
        },
        addBlock (state, block) {
            state.blocks.unshift(block);
            state.latestBlockNumber = block.number;
        },
        addWhaleTransactions (state, txs) {
            state.whaleTransactions.push(...txs);
            let topTransactions = state.whaleTransactions.sort((a, b) => { 
                return (BigInt(a.value) > BigInt(b.value)) ? -1 : ((BigInt(a.value) < BigInt(b.value)) ? 1 : 0);
            }).slice(0, 10);
            state.whaleTransactions = topTransactions;
        }
    },
    getters: {
        blocks (state) {
            return state.blocks;
        },
        whaleTransactions (state) {
            return state.whaleTransactions;
        },
        gasPrice(state) {
            return ethers.utils.formatUnits(state.gasPrice, "gwei");
        }
    },
    actions: {
        async fetchLatestBlock(context) {
            const latestBlockNumber = await _provider.getBlockNumber();        
            if (latestBlockNumber > context.state.latestBlockNumber) {
                const latestBlock = await _provider.getBlockWithTransactions();
                context.commit("addBlock", latestBlock);
                context.commit("addWhaleTransactions", latestBlock.transactions);
            }
        },
        async fetchGasPrice(context) {
            const currentGasPrice = await _provider.getGasPrice();
            context.commit("updateGasPrice", currentGasPrice);
        },
        async fetchAccountBalance(context, payload) {
            const balance = await _provider.getBalance(payload.address);
            return ethers.utils.formatEther(balance);
        },
        async getBlock(context, payload) {
            return await context.state.blocks.find(b => {
                return b.hash === payload.hash;
            });
        },
        async changeNetwork(context, payload) {
            _provider = new ethers.providers.EtherscanProvider(payload.networkName, import.meta.env.VITE_ETHERSCANAPIKEY);
            context.commit("clearState");
            const currentGasPrice = await _provider.getGasPrice();
            context.commit("updateGasPrice", currentGasPrice);
        }
    }
})
   
const app = createApp(App)

app.use(router)
app.use(store);
app.mount('#app')
