<script>
  import { scale, slide } from 'svelte/transition';
  import { quadOut, quadInOut } from 'svelte/easing';
  import { Router, Link } from 'svelte-routing';
  import { userId } from '../store';
  import { googleSignIn, googleSignOut } from '../helpers/firebase';
  import { onDestroy } from 'svelte';

  export let open;

  let uid;
  const unsubscribe = userId.subscribe((id) => {
    uid = id;
  });
  onDestroy(() => unsubscribe);

</script>

{#if open}
  <nav
    transition:slide={{duration: 300, easing: quadInOut}}
    class="bg-primary-900 text-white-500"
    on:click="{() => open = false}"
  >
    <Router>
      <Link class="block mb-3" to="/">Home</Link>
      <Link class="block mb-3" to="about">日記の効果とは？</Link>
      {#if uid}
        <Link class="block mb-3" to="create">日記を書く</Link>
        <Link class="block" to="#" on:click={googleSignOut}>ログアウト</Link>
      {:else}
        <Link class="block" to="#" on:click={googleSignIn}>ログイン</Link>
      {/if}
    </Router>
  </nav>
  <hr transition:scale={{delay: 300, duration: 750, easing: quadOut, opacity: 1 }} />
{/if}

<style>
  nav {
    text-align: center;
    font-size: 1.5em;
    letter-spacing: 0.15em;
    padding: 1em;
    padding-top: 0;
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
