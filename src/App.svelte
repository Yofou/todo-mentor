<script>
	import EmptyBox from './empty_box.svelte'
	import Create from './create.svelte'
	import List from './list.svelte'
	import Item from './item.svelte'
	import Control from './control.svelte'
	import { theme, todos, type } from './stores.js'

	$: imgsrc = $theme == 'dark' ? 'build/images/icon-sun.svg' : 'build/images/icon-moon.svg'

	$: filteredTodos = $todos.filter(
		todo => {
			if ($type == "active" && todo.checked == true) {
				return false
			} else if ($type == "completed" && todo.checked == false) {
				return false
			} else {
				return true
			}
		}
	)

	const onCheck = index => () => {
		$todos[index].checked = !$todos[index].checked
		$todos[index] = $todos[index]
	}

	const onDelete = targetIndex => () => {
		$todos = $todos.filter( (_, todoIndex) => targetIndex != todoIndex )
	}

	import { quintOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';

	const [send, receive] = crossfade({
		duration: d => Math.sqrt(d * 200),

		fallback(node, params) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				duration: 600,
				easing: quintOut,
				css: t => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
			};
		}
	});
</script>

<main class:light={$theme == 'light'}>
	<div id="background"></div>
	<div class="container">
		<h1 class="header">TODO</h1>
		<img 
			on:click={ () => $theme = $theme == 'dark' ? 'light' : 'dark' }
			class="header" 
			src={imgsrc} 
			alt="dark theme"
		>

		<Create />
		<List>
			{#if filteredTodos.length > 0}
				{#each filteredTodos as todo, index}
					<Item 
						{...todo} 
						on:click={ onCheck(index) } 
						on:delete = { onDelete(index) } 
					/>	
				{/each}
			{:else}
				<div class="empty">
					<EmptyBox />
				</div>
			{/if}
		</List>

		<Control />

		<p class="footer">Drag and drop to reorder the list</p>
	</div>
</main>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap');

	:global( :root ) {
		--family: 'Josefin Sans', sans-serif;

		--primary: #3a7bfd;
		--grad: linear-gradient(-45deg, hsl(192, 100%, 67%), hsl(280, 87%, 65%));
		
		--panel: #25273c;
		--background: #161722;
		--drop-shadow: #0E0F17;
		--highlight-300: #4d5066;
		--highlight-500: #393a4c;
		--list-text: #cacde8;;
		--check-border: var(--highlight-500);
		--footer-color: var(--highlight-300);
		--footer-color-hover: white; 
	}

	.empty {
		display: grid;
		place-content: center;
		width: 100%;
		height: 100%;
	}

	.light {
		--background: #fafafa;
		--panel: #ffffff;
		--drop-shadow: #E6E5EC;
		--highlight-500: hsl(236, 9%, 61%);
		--highlight-300: hsl(235, 19%, 35%);
		--list-text: var(--highlight-300);
		--check-border: #f3f3f3;
		--footer-color: var(--highlight-500);
		--footer-color-hover: var(--highlight-300); 
	}

	:global( * ), :global(html), :global(body) { 
		font-size: 18px; 
		margin: 0;
		padding: 0;
		transition: color 0.1s ease-in-out, background 0.1s ease-in-out, drop-shadow 0.1s ease-in-out;
	}

	main {
		width: 100%;
		height: 100%;
		background: var(--background);
		
		display: grid;
		grid-template: 1fr 2fr / 1fr;
	}

	#background { 
		background-image: url( images/bg-desktop-dark.jpg );
		background-repeat: no-repeat;
		background-size: cover;
	}
	.light #background { background-image: url( images/bg-desktop-light.jpg ) }

	.container {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		
		width: 37%;
		height: 90%;

		display: grid;
		grid-template: 100px 80px 450px 1fr / 1fr 1fr;
		gap: 5px;
		grid-template-areas: "header theme "
							 "create create"
							 "list   list  "
							 "footer footer";
	}

	.header {
		transform: translateY(20%);
	}

	h1.header { 
		grid-area: header;
		align-self: center;

		font-size: 2.3rem;
		letter-spacing: .7rem;
		color: white;
		font-family: var(--family);
		user-select: none;
	}
	
	img.header {
		cursor: pointer;
		align-self: center;
		justify-self: end;
	}

	.footer {
		font-family: var(--family);
		color: var(--footer-color);
		font-size: 0.90rem;
		grid-area: footer;
		justify-self: center;
		align-self: end;
		transform: translateY(-10px);
	}

	@media ( max-width: 1150px ) {
		.container {
			width: 90%;
			height: 93%;
			grid-template: 90px 70px 350px 70px 1fr / 1fr 1fr;
			grid-template-areas: "header theme "
							 "create  create"
							 "list    list  "
							 "control control"
							 "footer  footer";
		}

		h1.header { font-size: 1.5rem; }
		img.header { scale: 0.85; }
		
		#background { background-image: url( images/bg-mobile-dark.jpg ) }
		.light #background { background-image: url( images/bg-mobile-light.jpg ) }
		
		.footer { font-size: .85rem; place-self: center; }
	}
</style>