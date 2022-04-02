<script>
  import { onMount } from 'svelte';
  import { ProgressLinear, Slider, TextField, Button } from 'smelte';
  import { getDiary, updateDiary } from '../helpers/api';
  import dayjs from 'dayjs';
  import NoticeDialog from './NoticeDialog.svelte';
  import ErrorDialog from './ErrorDialog.svelte';

  export let id;
  let diary = getDiary();
  let isShowDialog = false;
  let msg = '';
  let isError = false;
  let image, imgPreview;

  onMount(async () => {
    diary = await getDiary(id);
  });

  const submit = async () => {
    if (diary.body.length < 10) {
      msg = '本文は10文字以上で入力してください。';
      isError = true;
      return false;
    }
    const updateResult = await updateDiary(id, diary, image);
    if (updateResult) {
      msg = '日記を更新しました。';
      isShowDialog = true;
    } else {
      msg = '日記の更新に失敗しました。';
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

  const onClickOk = () => {
    isShowDialog = false
    document.location.href = '/#';
  };
</script>

{#await diary}
  <p>Now Loading...</p>
  <ProgressLinear color="accent" />
{:then}
  <form on:submit|preventDefault={submit}>
    <h4>{dayjs(diary.createdAt).format('YYYY年MM月DD日')}</h4>
    <div class="flex justify-center mb-4">
      {#if imgPreview}
        <img src={imgPreview} alt="diary"/>
      {:else}
        <img src={diary.image || '/dummy.jpeg'} alt="diary"/>
      {/if}
    </div>
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
    <div class="mt-4">気分は{diary.rate}点</div>
    <Slider class="my-4" bind:value={diary.rate} min="1" max="10"/>
    <TextField
      class="bg-white-900"
      bind:value={diary.body}
      label="本文"
      outlined
      textarea
      rows="5"
    />
    <Button class="mb-4" type="submit" color="accent">日記を更新</Button>
  </form>
{/await}
<NoticeDialog on:ok={onClickOk} showDialog={isShowDialog} msg={msg} />
<ErrorDialog on:ok={() => isError = false} isError={isError} msg={msg} />
