import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
  state: () => ({
    siteInfo: {
      name: '某某企业官网',
      phone: '400-123-4567',
      address: 'XX省XX市XX区XX科技园',
      email: 'contact@example.com'
    },
    loading: false
  }),
  actions: {
    setLoading(status) {
      this.loading = status;
    }
  }
});
