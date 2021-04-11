<template>
  <div>
    <input type="text" class="todo-input" placeholder="What needs to be done" v-model="newTodo" @keyup.enter="addTodo">

    <div v-for="todo in todos" :key="todo.id" class="todo-item">
      <div>
        {{ todo.title }}
      </div>

      <div class="remove-item">
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
        'completed': false
       },
       {
        'id': 2,
        'title': 'Take over world',
        'completed': false
       },
     ]
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
        completed: false
      });

      this.newTodo = '';
      this.idForTodo++;
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
</style>
