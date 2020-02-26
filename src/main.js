import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import {BootstrapVue} from "bootstrap-vue";

import {library} from "@fortawesome/fontawesome-svg-core";
import {faHandsHelping, faUserSecret, faTasks, faStar, faTrashAlt, faCheck, faQuestion} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

import {Api} from "./services/webapi";

Vue.use(BootstrapVue);

library.add(faTasks, faHandsHelping, faUserSecret, faTrashAlt, faStar, faCheck, faQuestion);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.prototype.$log = function (...args) {
  window.console.log(...args);
};

const api = new Api();
Vue.prototype.$api = api;

// Only launch APP if connected to server.
api.authenticate()
  .then(() => {
    window.console.info("Authenticated");
    new Vue({
      router,
      render: h => h(App),
    }).$mount("#app");
  })
  .catch(error => {
    alert(error);
    window.console.error(`Token could not be requested:${error}`);
  });
