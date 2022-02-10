# todo-vue

> A Vue.js project

The project is the Client for the [Laravel server](https://github.com/MikiWojak/todo-laravel)

Based on the tutorial [Vue.js Todo App](https://www.youtube.com/playlist?list=PLEhEHUEU3x5q-xB1On4CsLPts0-rZ9oos)

## General Setup

-   Clone the repository
-   Edit the address of the server API in src/store/store.js

```javascript
// Address of the server API - line 6
axios.defaults.baseURL = 'http://localhost/api';
// For instance: 'http://todo-laravel.com/api'
```

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# Some steps further
# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
