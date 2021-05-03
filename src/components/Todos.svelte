<script>
  import FilterButton from "./FilterButton.svelte";
  import Todo from "./Todo.svelte";
  export let todos = [];
  let newTodoName = "";
  let newTodoId;
  let filter = "all";

  $: totalTodos = todos.length;
  $: completedTodos = todos.filter((todo) => todo.completed).length;
  $: {
    if (totalTodos === 0) {
      newTodoId = 1;
    } else {
      newTodoId = Math.max(...todos.map((t) => t.id)) + 1;
    }
  }
  $: console.log("newTodoName: ", newTodoName);

  function addTodo() {
    const newTodo = {
      id: newTodoId,
      name: newTodoName,
      completed: false,
    };
    todos = [...todos, newTodo];
    newTodoName = "";
  }
  function updateTodo(todo) {
    const i = todos.findIndex((t) => t.id === todo.id);
    todos[i] = { ...todos[i], ...todo };
  }
  function removeTodo(todo) {
    todos = todos.filter((t) => t.id !== todo.id);
  }
  const filterTodos = (filter, todos) => {
    if (filter === "active") {
      todos = todos.filter((t) => !t.completed);
    } else if (filter === "completed") {
      todos = todos.filter((t) => t.completed);
    }
    return todos;
  };
</script>

<!-- <h1>Svelte To-Do list</h1> -->

<!-- Todos.svelte -->
<div class="todoapp stack-large">
  <!-- NewTodo -->
  <form on:submit|preventDefault={addTodo}>
    <h2 class="label-wrapper">
      <label for="todo-0" class="label__lg"> What needs to be done? </label>
    </h2>
    <input
      type="text"
      id="todo-0"
      autocomplete="off"
      class="input input__lg"
      bind:value={newTodoName}
    />
    <button type="submit" disabled="" class="btn btn__primary btn__lg">
      Add
    </button>
  </form>

  <!-- Filter -->
  <FilterButton bind:filter />

  <!-- TodosStatus -->
  <h2 id="list-heading">
    {completedTodos} out of {totalTodos} items completed
  </h2>

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
  <div class="btn-group">
    <button type="button" class="btn btn__primary">Check all</button>
    <button type="button" class="btn btn__primary">Remove completed</button>
  </div>
</div>
