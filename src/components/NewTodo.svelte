<script>
  import { createEventDispatcher, onMount } from "svelte";
  import { focusOnInit, selectOnFocus } from "../actions.js";
  const dispatch = createEventDispatcher();

  let name = "";

  const addTodo = () => {
    dispatch("addTodo", name);
    name = "";
  };

  const onCancel = () => {
    name = ""; // give focus to the name input
  };
</script>

<form
  on:submit|preventDefault={addTodo}
  on:keydown={(e) => e.key === "Escape" && onCancel()}
>
  <h2 class="label-wrapper">
    <label for="todo-0" class="label__lg">What needs to be done?</label>
  </h2>
  <h2 class="label-wrapper">
    <small class="label__lg">Ramandeep Bhagat</small>
  </h2>
  <input
    use:focusOnInit
    use:selectOnFocus
    bind:value={name}
    type="text"
    id="todo-0"
    autoComplete="off"
    class="input input__lg"
  />
  <button type="submit" disabled={!name} class="btn btn__primary btn__lg"
    >Add</button
  >
</form>
