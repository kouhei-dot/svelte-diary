<script>
  import { onMount } from 'svelte';
  import { ProgressLinear, Slider, TextField, Button } from 'smelte';
  import { getDiary, updateDiary, deleteDiary } from '../helpers/api';
  import dayjs from 'dayjs';
  import NoticeDialog from './NoticeDialog.svelte';
  import ErrorDialog from './ErrorDialog.svelte';
  import ConfirmDialog from './ConfirmDialog.svelte';

  export let id;
  let diary = getDiary();
  let isShowDialog = false;
  let msg = '';
  let isError = false;
  let image, imgPreview;
  let isShowConfirm = false;

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

  const execDelete = async () => {
    isShowConfirm = false;
    const result = await deleteDiary(id);
    if (result) {
      msg = '日記を削除しました。';
      isShowDialog = true;
    } else {
      msg = '日記を削除に失敗しました。';
      isError = true;
    }
  };

  const showConfirm = () => {
    msg = '日記を削除します。よろしいですか？';
    isShowConfirm = true;
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
      class="bg-primary-700 hover:bg-primary-400 px-5 py-3 rounded duration-500 dark:text-black cursor-pointer"
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
      class="bg-white-900 dark:bg-dark-500"
      bind:value={diary.body}
      label="本文"
      outlined
      textarea
      rows="5"
    />
    <div class="flex justify-center dark:text-black">
      <Button class="mx-2" type="submit" color="accent">日記を更新</Button>
      <Button class="mx-2" color="secondary" on:click={showConfirm}>日記を削除</Button>
    </div>
  </form>
{/await}
<NoticeDialog
  on:ok={() => document.location.href = '/#'}
  bind:showDialog={isShowDialog}
  msg={msg}
/>
<ErrorDialog bind:isError={isError} msg={msg} />
<ConfirmDialog
  msg={msg}
  bind:isShow={isShowConfirm}
  on:ok={execDelete}
/>

