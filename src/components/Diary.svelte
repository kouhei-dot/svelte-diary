<script>
  import { onMount } from 'svelte';
  import { ProgressLinear, Slider, TextField, Button } from 'smelte';
  import { getDiary, updateDiary } from '../helpers/api';
  import dayjs from 'dayjs';
  import NoticeDialog from './NoticeDialog.svelte'
  import ErrorDialog from './ErrorDialog.svelte'

  export let id;
  let rate, body;
  let diary = getDiary();
  let isShowDialog = false;
  let msg = '';
  let isError = false;

  onMount(async () => {
    diary = await getDiary(id);
    rate = diary.rate;
    body = diary.body;
  });

  const submit = async () => {
    if (body.length < 10) {
      msg = '本文は10文字以上で入力してください。';
      isError = true;
      return false;
    }
    const updateResult = await updateDiary(id, body, rate);
    if (updateResult) {
      msg = '日記を更新しました。';
      isShowDialog = true;
    } else {
      msg = '日記の更新に失敗しました。';
      isError = true;
    }
  };

  const onClickOk = () => {
    isShowDialog = false
    document.location.href = '/#';
  };
</script>

{#await diary}
  <p>Now Loading...</p>
  <ProgressLinear />
{:then}
  <form on:submit|preventDefault={submit}>
    <h4>{dayjs(diary.createdAt).format('YYYY年MM月DD日')}</h4>
    <img src={diary.image || '/dummy.jpeg'} alt="diary"/>
    <div class="mt-4">今日の気分は{rate}点</div>
    <Slider class="my-4" bind:value={rate} min="1" max="10"></Slider>
    <TextField class="bg-white-900" bind:value={body} label="本文" outlined textarea rows="5"></TextField>
    <Button class="mb-4" type="submit" color="accent">日記を更新</Button>
  </form>
{/await}
<NoticeDialog on:ok={onClickOk} showDialog={isShowDialog} msg={msg} />
<ErrorDialog on:ok={() => isError = false} isError={isError} msg={msg} />
