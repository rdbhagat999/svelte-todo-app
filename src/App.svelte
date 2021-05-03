<script>
  import Alert from "./components/Alert.svelte";
  import Todos from "./components/Todos.svelte";
  import { todos } from "./stores.js";

  console.log("todos store", todos);
  console.log("todos store content - $todos:", $todos);
</script>

<Alert />
<Todos bind:todos={$todos} />

<style></style>
