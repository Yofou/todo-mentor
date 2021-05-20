<script>
    import { type } from './stores.js'
</script>

<div>
    <p class:toggle={$type == 'all'} class="all" on:click={type.toggle('all')} >All</p>
    <p class:toggle={$type == 'active'} class="active" on:click={type.toggle('active')}>Active</p>
    <p class:toggle={$type == 'completed'} class="completed" on:click={type.toggle('completed')}>Completed</p>
</div>

<style>
    div {
        grid-area: control;
        background: var(--panel);
        box-shadow: 0px 20px 50px var(--drop-shadow);
        height: 80%;
        border-radius: 6px;

        display: grid;
        grid-template: 1fr / 2fr 1fr 2fr;
        align-self: center;
    }

    .all, .active, .completed {
        font-family: var(--family);
        font-size: 0.85rem;
        place-self: center;
        color: var(--footer-color);
        transition: color 0.1s ease-in-out;
        font-weight: 700;
        cursor: pointer;
        transform: translateX(-50%);
        margin: 0 20px;
        user-select: none;
    }

    .all { justify-self: end; align-self: center; }
    .active { place-self: center; }
    .completed { justify-self: start; align-self: center; }

    p:hover { color: var(--footer-color-hover); }

    .toggle, .toggle:hover { color: var(--primary) }
    
    @media (min-width: 1150px) {
        div { display: none; }
    }
</style>