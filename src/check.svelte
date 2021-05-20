<script>
    export let checked = false
</script>

<div on:click class:checked={checked}>
    {#if checked}
        <img src="build/images/icon-check.svg" alt="checked">
    {/if}
</div>

<style>
    div {
        --color: var(--check-border);
        --radius: 24px;

        cursor: pointer;
        width: var(--radius);
        height: var(--radius);
        
        border-radius: 50%;
        border: transparent solid 2px;
        background: 
            linear-gradient(to right, var(--panel), var(--panel)), 
            var(--color); 
        background-clip: padding-box, border-box;
        background-origin: padding-box, border-box;
        transition: border 50ms ease-in-out, background 0.1s ease-in-out;
        
        display: grid;
        place-content: center;
        place-self: center;
    }

    div:hover {
        --color: var(--grad);
    }

    .checked {
        --color: var(--grad);
        border: transparent solid 0px;
        background:
            var(--color), 
            var(--color);
    }

    @media (max-width: 1150px) {
        div { --radius: calc(24px * 0.9) }
    }
</style>