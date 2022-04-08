<script>
  import { createEventDispatcher } from 'svelte';
  import { Dialog, Button } from 'smelte';

  export let isShow = false;
  export let msg = '処理を実行します。よろしいですか？';

  const dispatch = createEventDispatcher();
  const onClickOk = () => {
    isShow = false;
    dispatch('ok');
  };
</script>

<Dialog persistent class="bg-white-900" bind:value={isShow}>
  <h5 slot="title">確認</h5>
  <div class="text-gray-700">{msg}</div>
  <div slot="actions">
    <Button on:click={() => isShow = false} color="secondary">キャンセル</Button>
    <Button on:click={onClickOk}>OK</Button>
  </div>
</Dialog>

<style>
  div {
    min-width: 200px;
  }
</style>
