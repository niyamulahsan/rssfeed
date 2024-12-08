import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from "./router";
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8000";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './assets/app.scss';

createApp(App).use(createPinia()).use(router).mount('#app');
