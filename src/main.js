// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import Master from './components/layouts/Master'
import { store } from './store/store'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import { required, email, min } from 'vee-validate/dist/rules'
import CxltToastr from 'cxlt-vue2-toastr'

//EventBus
window.eventBus = new Vue();

//Development or Production
Vue.config.productionTip = false;

// VueRouter
Vue.use(VueRouter);

const router = new VueRouter({
  routes: routes,
  mode: 'history'
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.loggedIn) {
      next({
        name: 'login',
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (store.getters.loggedIn) {
      next({
        name: 'todo',
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

//VeeValidate
extend('required', {
  ...required,
  message: 'This field is required'
});

extend('email', {
  ...email,
  message: 'The email field must be a valid email'
});

extend('min', {
  ...min,
  message: 'The password field must be at least 6 characters'
});

//CxltToastr
const toastrConfigs = {
  position: 'bottom right',
  showDuration: 2000,
  timeOut: 5000,
  progressBar: true,
};
Vue.use(CxltToastr, toastrConfigs);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  store: store,
  components: {
    Master,
    ValidationProvider,
    ValidationObserver
  },
  template: '<Master/>'
})
