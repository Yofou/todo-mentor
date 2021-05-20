import { writable } from 'svelte/store'

function createType() {
    const { subscribe, set } = writable('all')

    return {
        subscribe,
        toggle: (value) => () => set(value)
    }
}

export const theme = writable('dark')
export const type = createType()
export const todos = writable([])