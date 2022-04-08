<script>
  import { onDestroy } from 'svelte';
  import { Slider, TextField, Button } from 'smelte';
  import { userId } from '../store';
  import NoticeDialog from './NoticeDialog.svelte';
  import ErrorDialog from './ErrorDialog.svelte';
  import { postDiary } from '../helpers/api';

  let rate = 5;
  let body = '';
  let isShowDialog = false;
  let msg = '';
  let isError = false;
  let image = '';
  let imgPreview = '';

  let uid = null;
  const unsubscribe = userId.subscribe((id) => {
    uid = id;
  });
  onDestroy(() => unsubscribe);

  const submit = async () => {
    if (body.length < 10) {
      msg = '本文は10文字以上で入力してください。';
      isError = true;
      return false;
    }
    const result = await postDiary(uid, rate, body, image);
    if (result) {
      msg = '日記を追加しました。';
      isShowDialog = true;
    } else {
      msg = '日記の追加に失敗しました。';
      isError = true;
    }
  };

  const onfileSelect = (e) => {
    const target = e.target.files[0];
    image = target;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(target);
    fileReader.onload = (e) => {
      imgPreview = e.target.result;
    };
  };
</script>

<h3>日記を書こう！</h3>
<form on:submit|preventDefault="{submit}">
  <span>今日の気分は{rate}点</span>
  <Slider class="my-6" bind:value={rate} min="1" max="10"/>
  <TextField
    class="bg-white-900"
    bind:value={body}
    label="本文"
    outlined
    textarea
    rows="5"
  />
  {#if imgPreview}
    <div class="flex justify-center">
      <img src={imgPreview} alt="preview" />
    </div>
  {/if}
  <div class="my-6">
    <label
      class="bg-primary-500 px-5 py-3 rounded hover:shadow-lg transition-shadow duration-500"
      role="button"
      for="image"
    >
      画像を選択
    </label>
    <input
      type="file"
      id="image"
      hidden
      accept="/image/*"
      bind:this={image}
      on:change={onfileSelect}
    />
  </div>
  <Button class="mt-6" type="submit" color="accent">日記を保存</Button>
</form>
<NoticeDialog
  on:ok={() => document.location.href = '/#'}
  bind:showDialog={isShowDialog}
  msg={msg}
/>
<ErrorDialog bind:isError={isError} msg={msg} />
