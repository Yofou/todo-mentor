<script>
    import Check from './check.svelte'
    import { todos } from './stores.js'
    let checked = false
    let value = ""

    const onEnter = (e) => {
        if (e.key != "Enter" || value.length == 0) return 
        $todos = [...$todos, { checked, value }]
        value = ''
    }
</script>

<div class="container">
    <Check on:click={ () => checked = !checked }  {checked} />
    <input placeholder="Create a new todo..." type="text" bind:value={value} on:keyup={onEnter}>
</div>

<style>
    .container {
        grid-area: create;
        background: var(--panel);
        box-shadow: 0px 10px 90px var(--drop-shadow);
        height: 80%;
        border-radius: 6px;

        display: grid;
        grid-template: 1fr / 75px 1fr;
    }

    input {
        background: inherit;

        width: 100%;
        height: 100%;
        border: none;

        color: var(--list-text);
        font-family: var(--family);
        font-size: 1.2rem;
        font-weight: 400;
        padding: 0;
        margin: 0;
    }

    input:focus { 
        outline: none;
        caret-color: var(--primary) 
    }

    @media (max-width: 1150px) {
        input { font-size: 0.9rem; }
    }
</style>