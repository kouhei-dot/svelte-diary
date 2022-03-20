<script>
  import { fly, scale } from 'svelte/transition';
  import { quadOut } from 'svelte/easing';
  import { Router, Link } from 'svelte-routing';

  export let open;
</script>

{#if open}
  <nav class="bg-primary-900" on:click="{() => open = false}">
    <Router>
      <Link class="block" to="/">Home</Link>
      <Link class="block" to="about">About</Link>
      <Link class="block" to="create">Create</Link>
    </Router>
  </nav>
  <hr transition:scale={{ duration: 750, easing: quadOut, opacity: 1 }} />
{/if}

<style>
  nav {
    text-align: center;
    font-size: 1.5em;
    letter-spacing: 0.15em;
    padding: 1em;
    padding-top: 0;
    color: #eef;
  }
  a {
    cursor: pointer;
    width: max-content;
    margin: 1rem auto;
  }
  a:hover {
    text-decoration: underline;
  }
</style>
