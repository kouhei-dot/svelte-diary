<script>
  import { createEventDispatcher } from 'svelte';
  import { Dialog, Button } from 'smelte';
  export let isError = false;
  export let msg = 'エラーが発生しました。通信環境をお確かめの上再度実行してください。';

  const dispatch = createEventDispatcher();

  const onClickOk = () => {
    isError = false;
    dispatch('ok');
  };
</script>

<Dialog persistent class="bg-white-900" bind:value={isError}>
  <h5 slot="title">エラー</h5>
  <div class="text-gray-700 dark:text-gray-100">{msg}</div>
  <div slot="actions" class="flex justify-end dark:text-black">
    <Button on:click={onClickOk}>OK</Button>
  </div>
</Dialog>

<style>
  div {
    min-width: 200px;
  }
</style>
