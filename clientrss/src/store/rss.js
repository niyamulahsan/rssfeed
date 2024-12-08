import axios from "axios";
import { defineStore } from "pinia";

export const useRss = defineStore('rss', {
  state: () => ({
    rss: [],
    isLoading: false
  }),
  getters: {
    getRss: (state) => state.rss,
  },
  actions: {
    async fetchAll(param) {
      this.isLoading = true;
      try {
        const dt = await axios.get(`/api/rss`, { params: param });
        this.rss = dt.data.rss;
        return dt.data.rss;
      } catch (err) {
        console.log(err.message);
      } finally {
        this.isLoading = false;
      }
    },
    async fetchDistinctPubDate(param) {
      this.isLoading = true;
      try {
        const dt = await axios.get(`/api/rss/pubdate`, { params: param });
        return dt.data.rss.result;
      } catch (err) {
        console.log(err.message);
      } finally {
        this.isLoading = false;
      }
    }
  }
});