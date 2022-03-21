<script>
  import 'smelte/src/tailwind.css';
  import { Route, Router } from 'svelte-routing';
  import Button from 'smelte/src/components/Button';
  import Header from './components/Header.svelte'
  import Footer from './components/Footer.svelte'
  import Home from './components/Home.svelte';
  import Create from './components/Create.svelte';
  import Diary from './components/Diary.svelte';
  import About from './components/About.svelte';
  import './helpers/firebase';

	export let url;
</script>

<main class="bg-background-700">
  <Header />
  <section class="content">
    <Router url="{url}">
      <Route path="diary/:id" component="{Diary}" />
      <Route path="create" component="{Create}" />
      <Route path="about" component="{About}" />
      <Route path="/">
        <Home />
      </Route>
      <Button class="bg-accent-500">This is a cool button!!</Button>
    </Router>
  </section>
  <Footer />
</main>

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
