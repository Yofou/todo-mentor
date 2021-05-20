<script>
    import { type } from './stores.js'
    const toggle = (toggleType) => () => $type = toggleType
</script>

<div>
    <p class:toggle={$type == 'all'} class="all" on:click={toggle('all')} >All</p>
    <p class:toggle={$type == 'active'} class="active" on:click={toggle('active')}>Active</p>
    <p class:toggle={$type == 'completed'} class="completed" on:click={toggle('completed')}>Completed</p>
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
    }

    .all { justify-self: end; align-self: center; }
    .active { place-self: center; }
    .completed { justify-self: start; align-self: center; }

    p:hover { color: var(--footer-color-hover); }

    .toggle, .toggle:hover { color: var(--primary) }
    
    @media (min-width: 900px) {
        div { display: none; }
    }
</style>