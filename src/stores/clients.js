import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useClientsStore = defineStore('clients', {
  state: () => ({
    clients: [
      {
        id: 1,
        name: 'Robert Lee',
        email: 'robert.lee@example.com',
        phone: '(555) 123-4567',
        portfolioValue: 1240000,
        riskScore: 72,
        goalProgress: 81,
        status: 'active',
        lastUpdated: '2/3/2022',
        advisor: 'Carl Smith',
        trades: []
      },
      {
        id: 2,
        name: 'Andrew Santino',
        email: 'asantino@example.com',
        phone: '(555) 234-5678',
        portfolioValue: 3100000,
        riskScore: 88,
        goalProgress: 94,
        status: 'active',
        lastUpdated: '2/3/2022',
        advisor: 'Carl Smith',
        trades: []
      },
      {
        id: 3,
        name: 'Thomas Segura',
        email: 'tsegura@example.com',
        phone: '(555) 345-6789',
        portfolioValue: 890000,
        riskScore: 61,
        goalProgress: 67,
        status: 'active',
        lastUpdated: '2/3/2022',
        advisor: 'Carl Smith',
        trades: []
      },
      {
        id: 4,
        name: 'Bart Kristmas',
        email: 'bkristmas@example.com',
        phone: '(555) 456-7890',
        portfolioValue: 2200000,
        riskScore: 79,
        goalProgress: 82,
        status: 'active',
        lastUpdated: '2/3/2022',
        advisor: 'Carl Smith',
        trades: []
      }
    ],
    recentClients: [
      { id: 1, name: 'Robert Lee',     lastUpdated: '2/3/2022', portfolioValue: 1240000, riskScore: 72 },
      { id: 2, name: 'Andrew Santino', lastUpdated: '2/3/2022', portfolioValue: 3100000, riskScore: 88 },
      { id: 3, name: 'Thomas Segura',  lastUpdated: '2/3/2022', portfolioValue: 890000,  riskScore: 61 },
      { id: 4, name: 'Bart Kristmas',  lastUpdated: '2/3/2022', portfolioValue: 2200000, riskScore: 79 }
    ],
    loading: false,
    error: null
  }),

  getters: {
    getClientById: (state) => (id) => {
      return state.clients.find(c => c.id === Number(id))
    }
  },

  actions: {
    async fetchClients() {
      this.loading = true
      this.error = null
      try {
        const { data } = await api.get('/api/clients')
        this.clients = data
      } catch (e) {
        this.error = e.message
      } finally {
        this.loading = false
      }
    },

    async addClient(client) {
      const newClient = {
        ...client,
        // id: this.clients.length + 1,
        // lastUpdated: new Date().toLocaleDateString(),
        // status: 'active',
        // trades: []
      }
      console.log(newClient)
      try {
        await api.post('/api/clients', newClient)
      } catch (error) {
        this.error = error.message
      }
      this.clients.push(newClient)
      return newClient
    }
,
    async deleteClient(clientId){
      try {
        this.loading = true;
        await api.delete(`/api/clients/${clientId}`)
        await this.fetchClients();
        this.loading = false;
      } catch (error) {
        this.error = error.message
      }
    }
  }
})
