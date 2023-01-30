<script>
	import Todos from "./components/Todos.svelte";

	let todos = [
    	{ id: 1, name: "Create a Svelte starter app", completed: true },
    	{ id: 2, name: "Create your first component", completed: true },
    	{ id: 3, name: "Complete the rest of the tutorial", completed: false }
	];

</script>

<Todos todos={todos}/>

<main>
	<p>Built with guidance from 
		<a href=https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Svelte_Todo_list_beginning>Mozilla's tutorial</a></p>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>

<style>
	main {
		text-align: center;
		font-style: italic;
		color:gray;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>