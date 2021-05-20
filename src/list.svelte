<script>
    import { todos, type } from './stores.js'
    import { onMount } from "svelte";
    import Sortable from 'sortablejs'

    let list;
    onMount( () => {
        new Sortable(list, {
            animation: 150,
            ghostClass: 'selected',
            handle: 'p'
        })
    } )

    $: left = $todos.filter( ({checked}) => !checked ).length
    const clearCompleted = () => $todos = $todos.filter( ({checked}) => !checked )
</script>

<section>
    <div bind:this={list} class="list">
        <slot></slot>
    </div>

    <div class="control">
        <p class="counter">{left} items left</p>
        <p class:toggle={$type == 'all'} class="all" on:click={type.toggle('all')}>All</p>
        <p class:toggle={$type == 'active'} class="active" on:click={type.toggle('active')}>Active</p>
        <p class:toggle={$type == 'completed'} class="completed" on:click={type.toggle('completed')}>Completed</p>
        <p class="clear" on:click={clearCompleted}>Clear Completed</p>
    </div>
</section>

<style>
    section {
        display: grid;
        grid-area: list;
        grid-template: 1fr 50px / 1fr;
        background: var(--panel);
        border-radius: 5px;
        box-shadow: 0px 20px 50px var(--drop-shadow);
    }

    .list {
        overflow: hidden;
        overflow-y: scroll;
        scrollbar-width: none;
    }

    .control {
        box-sizing: content-box;
        border-top: var(--check-border) solid 1px;

        display: grid;
        grid-template: 1fr / 100px 1fr 1fr 1fr 2fr;
        grid-template-areas: "counter all active completed clear";
    }

    
    .control p {
        font-family: var(--family);
        font-size: 0.85rem;
        place-self: center;
        color: var(--footer-color);
        transition: color 0.1s ease-in-out;
        font-weight: 700;
        user-select: none;
    }

    .control p:hover { color: var(--footer-color-hover); }

    .control .counter { 
        grid-area: counter;
        transform: translateX(10%);
        font-size: 0.75rem;
    }

    .control .counter:hover { color: var(--footer-color); }

    .control .all { grid-area: all; justify-self: right; }
    .control .active { grid-area: active }
    .control .completed { grid-area: completed; justify-self: left; }
    .control .clear { 
        grid-area: clear; font-weight: 400;
        justify-self: end; 
        align-self: center; 
        transform: translateX(-20px);
    }

    .control :where(.all, .active, .completed, .clear) { cursor: pointer }
    .control :is(.toggle, .toggle:hover) { color: var(--primary) }

    @media (max-width: 1150px) {
        .control { grid-template-areas: "counter . . clear clear"; }
        .control :where(.all, .active, .completed) { display: none; }
        .control :is(.counter, .clear) { font-size: 0.75rem; }
    }
</style>
