<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  let completed = true;
  export let todos;

  const checkAll = () => {
    dispatch("checkAll", completed);
    completed = !completed;
  };

  const removeCompleted = () => dispatch("removeCompleted");
  $: completedTodos = todos.filter((t) => t.completed).length;
</script>

<div class="btn-group">
  <button
    type="button"
    class="btn btn__primary"
    on:click={checkAll}
    disabled={todos.length === 0}>{completed ? "Check" : "Uncheck"} all</button
  >
  <button
    type="button"
    class="btn btn__primary"
    on:click={removeCompleted}
    disabled={completedTodos === 0}>Remove completed</button
  >
</div>
