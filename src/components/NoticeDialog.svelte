<script>
  import { createEventDispatcher } from 'svelte';
  import { Dialog, Button } from 'smelte';

  export let showDialog = false;
  export let msg = '処理が完了しました。';

  const dispatch = createEventDispatcher();
  const onClickOk = () => {
    showDialog = false;
    dispatch('ok');
  };
</script>

<Dialog persistent class="bg-white-900" bind:value={showDialog}>
  <h5 slot="title">完了</h5>
  <div class="text-gray-700">{msg}</div>
  <div slot="actions" class="flex justify-end">
    <Button on:click={onClickOk}>OK</Button>
  </div>
</Dialog>

<style>
  div {
    min-width: 200px;
  }
</style>
