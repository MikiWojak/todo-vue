<template>
  <div>
    <input type="text" class="todo-input" placeholder="What needs to be done" v-model="newTodo" @keyup.enter="addTodo">

    <div v-for="(todo, index) in todos" :key="todo.id" class="todo-item">
      <div class="todo-item-left">
          <div v-if="!todo.editing" @dblclick="editTodo(todo)" class="todo-item-label">{{ todo.title }}</div>
          <input v-else class="todo-item-edit" type="text" v-model="todo.title" @blur="doneEdit(todo)" @keyup.enter="doneEdit(todo)">
      </div>

      <div class="remove-item" @click="removeTodo(index)">
        &times;
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'todo-list',
  data () {
    return {
     newTodo: '',
     idForTodo: 3,
     todos: [
       {
        'id': 1,
        'title': 'Finish Vue Screencast',
        'completed': false,
        'editing': false
       },
       {
        'id': 2,
        'title': 'Take over world',
        'completed': false,
        'editing': false
       },
     ]
    }
  },

  directives: {
    focus: {
      inserted: function (el) {
        el.focus();
      }
    }
  },

  methods: {
    addTodo() {
      if(this.newTodo === '') {
        return;
      }

      this.todos.push({
        id: this.idForTodo,
        title: this.newTodo,
        completed: false,
        editing: false
      });

      this.newTodo = '';
      this.idForTodo++;
    },

    editTodo(todo) {
      todo.editing = true;
    },

    doneEdit(todo) {
      todo.editing = false;
    },

    removeTodo(index) {
      this.todos.splice(index, 1);
    }
  }
}
</script>

<style>
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
</style>
