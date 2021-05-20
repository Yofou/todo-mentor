<script>
    import Check from './check.svelte'
    
    export let value;
    export let checked;
    
    import { createEventDispatcher } from 'svelte'
    const dispatcher = createEventDispatcher()
    const onDelete = () => dispatcher('delete', {})
</script>

<div>
    <Check on:click {checked} />
    <p class:checked={checked}>{value}</p>
    <img src="build/images/icon-cross.svg" alt="delete" on:click={onDelete}>
</div>


<style>
    div {
        display: grid;
        grid-template: 1fr / 75px 1fr 50px;
        height: 75px;
        border-bottom: var(--check-border) solid 1px;
        transition: border-bottom 0.1s ease-in-out;
    }

    div p {
        display: grid;
        align-content: center;
        align-self: center;
        
        width: 100%;
        height: 100%;
        
        color: var(--list-text);
        font-family: var(--family);
        font-size: 1.1rem;
        font-weight: 400;
        
        transition: color 0.1s ease-in-out;
    }

    div img {
        place-self: center;
        margin-right: 20px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.1s ease-in-out;
    }

    div:hover img { opacity: 1; }

    .checked {
        color: var(--highlight-500);
        text-decoration: line-through;
    }

    :global(.selected) {
        border-bottom: var(--primary) solid 1px !important;
    }

    @media (max-width: 1150px) {
        div p { font-size: 0.9rem; }
        div img { 
            scale: 0.8;
            opacity: 1;
        }
    }
</style>
