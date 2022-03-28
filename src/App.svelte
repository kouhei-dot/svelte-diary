<script>
  import { onDestroy } from 'svelte';
  import 'smelte/src/tailwind.css';
  import { Route, Router } from 'svelte-routing';
  import Header from './components/Header.svelte'
  import Footer from './components/Footer.svelte'
  import Home from './components/Home.svelte';
  import Create from './components/Create.svelte';
  import Diary from './components/Diary.svelte';
  import About from './components/About.svelte';
  import ErrorDialog from './components/ErrorDialog.svelte';
  import { isError } from './store';
  import './helpers/firebase';

  let _isError = false;
  const unsubscribe = isError.subscribe((isError) => {
    _isError = isError;
  });
  onDestroy(() => unsubscribe);

	export let url;
</script>

<main class="bg-background-700">
  <Header />
  <section class="content">
    <Router url="{url}">
      <Route path="diary/:id" let:params>
        <Diary id={params.id}/>
      </Route>
      <Route path="create" component="{Create}" />
      <Route path="about" component="{About}" />
      <Route path="/">
        <Home />
      </Route>
    </Router>
  </section>
  <Footer />
</main>

<ErrorDialog on:ok={() => isError.set(false)} isError={_isError} />

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 640px;
		margin: 0 auto;
	}
  .content {
    min-height: calc( 100vh - 60px - 60px );
  }
</style>
