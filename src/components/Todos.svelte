<script>
  import FilterButton from "./FilterButton.svelte";
  import NewTodo from "./NewTodo.svelte";
  import Todo from "./Todo.svelte";
  import TodosStatus from "./TodosStatus.svelte";
  import MoreActions from "./MoreActions.svelte";
  export let todos = [];
  let newTodoId;
  let filter = "all";
  let todosStatus;

  $: newTodoId = todos.length ? Math.max(...todos.map((t) => t.id)) + 1 : 1;

  function addTodo(name) {
    const newTodo = {
      id: newTodoId,
      name: name,
      completed: false,
    };
    todos = [...todos, newTodo];
  }
  function updateTodo(todo) {
    const i = todos.findIndex((t) => t.id === todo.id);
    todos[i] = { ...todos[i], ...todo };
  }
  function removeTodo(todo) {
    todos = todos.filter((t) => t.id !== todo.id);
    todosStatus.focus();
  }
  const filterTodos = (filter, todos) => {
    if (filter === "active") {
      todos = todos.filter((t) => !t.completed);
    } else if (filter === "completed") {
      todos = todos.filter((t) => t.completed);
    }
    return todos;
  };
  const checkAllTodos = (completed) =>
    (todos = todos.map((t) => ({ ...t, completed })));
  const removeCompletedTodos = () =>
    (todos = todos.filter((t) => !t.completed));
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
