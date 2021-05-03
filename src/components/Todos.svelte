<script>
  import FilterButton from "./FilterButton.svelte";
  import NewTodo from "./NewTodo.svelte";
  import Todo from "./Todo.svelte";
  import TodosStatus from "./TodosStatus.svelte";
  import MoreActions from "./MoreActions.svelte";
  import { alert } from "../stores.js";

  export let todos = [];
  let newTodoId;
  let filter = "all";
  let todosStatus;

  $: {
    if (filter === "all") $alert = "Browsing all todos";
    else if (filter === "active") $alert = "Browsing active todos";
    else if (filter === "completed") $alert = "Browsing completed todos";
  }

  $: newTodoId = todos.length ? Math.max(...todos.map((t) => t.id)) + 1 : 1;

  function addTodo(name) {
    const newTodo = {
      id: newTodoId,
      name: name,
      completed: false,
    };
    todos = [...todos, newTodo];
    $alert = `Todo '${name}' has been added`;
  }
  function updateTodo(todo) {
    const i = todos.findIndex((t) => t.id === todo.id);
    if (todos[i].name !== todo.name)
      $alert = `todo '${todos[i].name}' has been renamed to '${todo.name}'`;
    if (todos[i].completed !== todo.completed)
      $alert = `todo '${todos[i].name}' marked as ${
        todo.completed ? "completed" : "active"
      }`;
    todos[i] = { ...todos[i], ...todo };
  }
  function removeTodo(todo) {
    todos = todos.filter((t) => t.id !== todo.id);
    todosStatus.focus();
    $alert = `Todo '${todo.name}' has been deleted`;
  }
  const filterTodos = (filter, todos) => {
    if (filter === "active") {
      todos = todos.filter((t) => !t.completed);
    } else if (filter === "completed") {
      todos = todos.filter((t) => t.completed);
    }
    return todos;
  };
  const checkAllTodos = (completed) => {
    todos = todos.map((t) => ({ ...t, completed }));
    $alert = `${completed ? "Checked" : "Unchecked"} ${todos.length} todos`;
  };
  const removeCompletedTodos = () => {
    $alert = `Removed ${todos.filter((t) => t.completed).length} todos`;
    todos = todos.filter((t) => !t.completed);
  };
</script>

<!-- <h1>Svelte To-Do list</h1> -->

<!-- Todos.svelte -->
<div class="todoapp stack-large">
  <!-- NewTodo -->
  <NewTodo on:addTodo={(e) => addTodo(e.detail)} />

  <!-- Filter -->
  <FilterButton bind:filter />

  <!-- TodosStatus -->
  <TodosStatus bind:this={todosStatus} {todos} />

  <!-- Todos -->
  <ul role="list" class="todo-list stack-large" aria-labelledby="list-heading">
    {#each filterTodos(filter, todos) as todo (todo.id)}
      <!-- todo-2 -->
      <li class="todo">
        <Todo
          {todo}
          on:update={(e) => updateTodo(e.detail)}
          on:remove={(e) => removeTodo(e.detail)}
        />
      </li>
    {:else}
      <li>Nothing to do here!</li>
    {/each}
  </ul>

  <hr />

  <!-- MoreActions -->
  <MoreActions
    {todos}
    on:checkAll={(e) => checkAllTodos(e.detail)}
    on:removeCompleted={removeCompletedTodos}
  />
</div>
