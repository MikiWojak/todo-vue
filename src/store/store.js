import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);
axios.defaults.baseURL = 'http://localhost/todo-laravel/public/api';

export const store = new Vuex.Store({
    state: {
        todos: []
    },

    mutations: {
        retrieveTodos(state, todos) {
            state.todos = todos;
        },

        addTodo(state, todo) {
            state.todos.push({
                id: todo.id,
                title: todo.title,
                completed: false,
                editing: false
            });
        },

        updateTodo(state, todo) {
            const index = state.todos.findIndex(item => item.id === todo.id);
            state.todos.splice(index, 1, {
                'id': todo.id,
                'title': todo.title,
                'completed': todo.completed,
                'editing': todo.editing
            });
        },

        removeTodo(state, id) {
            const index = state.todos.findIndex(item => item.id === id);
            state.todos.splice(index, 1);
        }
    },

    actions: {
        retrieveTodos(context) {
            axios.get('/todos')
                .then(response => {
                    context.commit('retrieveTodos', response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        },

        addTodo(context, todo) {
            axios.post('/todos', {
                title: todo.title,
                completed: false
            })
                .then(response => {
                    context.commit('addTodo', response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        },

        updateTodo(context, todo) {
            axios.patch('/todos/' + todo.id, {
                title: todo.title,
                completed: todo.completed
            })
                .then(response => {
                    context.commit('updateTodo', response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        },

        removeTodo(context, id) {
            axios.delete('/todos/' + id)
                .then(response => {
                    context.commit('removeTodo', id);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
});