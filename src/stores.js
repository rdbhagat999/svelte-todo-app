import { writable } from 'svelte/store'
import { localStorageStore } from './localStorageStore.js'

export const alert = writable('Welcome to the To-Do list app!')

const initialTodos = [
  { id: 1, name: 'Learn Angular', completed: true },
  { id: 2, name: 'Learn NestJs', completed: true },
  { id: 2, name: 'Learn Flutter', completed: false },
]

export const todos = localStorageStore('mdn-svelte-todo', initialTodos)