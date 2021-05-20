import { writable } from 'svelte/store'

export const theme = writable('dark')
export const type = writable('all')
export const todos = writable([])