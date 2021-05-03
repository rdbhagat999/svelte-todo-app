import { writable } from 'svelte/store'
import { localStorageStore } from './localStorageStore.js'

export const alert = writable('Welcome to the To-Do list app!')

const initialTodos = [
  { id: 1, name: 'Visit MDN web docs', completed: true },
  { id: 2, name: 'Complete the Svelte Tutorial', completed: false },
]

export const todos = localStorageStore('mdn-svelte-todo', initialTodos)