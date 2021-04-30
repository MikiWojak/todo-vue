<template>
  <div>
    <input type="text" class="todo-input" placeholder="What needs to be done" v-model="newTodo" @keyup.enter="addTodo">

    <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">     
      <todo-item v-for="todo in todos" :key="todo.id" :todo="todo">
      </todo-item>
    </transition-group>
  </div>
</template>

<script>
import TodoItem from './TodoItem'

export default {
  name: 'todo-list',

  components: {
    TodoItem
  },

  data () {
    return {
      newTodo: '',
      idForTodo: 3
    }
  },

  created() {
    this.$store.dispatch('retrieveTodos');
  },

  computed: {
    todos() {
      return this.$store.state.todos;
    }
  },

  methods: {
    addTodo() {
      if (this.newTodo.trim() === '') { return; }

      this.$store.dispatch('addTodo', {
        id: this.idForTodo,
        title: this.newTodo
      });

      this.newTodo = '';
      this.idForTodo++;
    }
  }
}
</script>

<style>
  @import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css");

  .todo-input {
    width: 96%;
    padding: 10px 2%;
    font-size: 18px;
    margin-bottom: 16px;
  }

  .todo-input:focus {
    outline: 0;
  }

  .todo-item {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    animation-duration: 0.3s;
  }

  .remove-item {
    cursor: pointer;
    margin-left: 14px;
  }

  .remove-item:hover {
    color: black;
  }

  .todo-item-left {
    /* later */
    display: flex;
    align-items: center;
  }

  .todo-item-label {
    padding: 10px;
    border: 1px solid white;
    margin-left: 12px;
  }

  .todo-item-edit {
    font-size: 24px;
    color: #2c3e50;
    margin-left: 12px;
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc; /* override defaults */
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }

  .todo-item-edit:focus {
      outline: none;
  }

  .completed {
    text-decoration: line-through;
    color: grey;
  }
</style>
