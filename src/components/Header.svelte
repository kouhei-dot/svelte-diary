<script>
  import Hamburger from 'svelte-hamburgers';
  import 'svelte-hamburgers/dist/css/base.css';
  import 'svelte-hamburgers/dist/css/types/spin.css';
  import BrightnessContrast32 from "carbon-icons-svelte/lib/BrightnessContrast32/BrightnessContrast32.svelte";
  import Menu from './Menu.svelte';

  let open
</script>

<header class="bg-primary-900 flex justify-between items-center">
  <Hamburger bind:open --color="white" />
  <img src="/logo.png" alt="logo" on:click="{() => location.href = '/'}" />
  <BrightnessContrast32 class="mr-6 text-white-900" />
</header>
<Menu bind:open />

<style>
  header { height: 60px; }
  img { max-height: 100%; }
</style>
